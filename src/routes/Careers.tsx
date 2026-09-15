import { useEffect, useMemo, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { BriefcaseBusiness, Check, ExternalLink, Filter, MapPin, Search } from 'lucide-react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

type Opportunity = {
  id: string
  title: string
  company: string
  source: string
  isArchived: boolean
  date: string
  type: string
  location: string
  detail: string
  url: string
}

const fallbackOpportunities: Opportunity[] = [
  {
    id: 'sample-opportunity',
    title: 'Sample Opportunity',
    company: 'Sample Company',
    source: 'Sample Source',
    isArchived: false,
    date: '',
    type: 'Sample role type',
    location: 'Sample location',
    detail: 'This is dummy data for preview purposes. Real job details are not currently available because the Google Sheet could not be loaded.',
    url: '#',
  },
]

const careersCsvUrl = import.meta.env.VITE_CAREERS_SHEET_CSV_URL || 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT7M3jX2zR3OFRYPL8OQmZDrTFiUvhgAMqmAef3aI0JbsW7U4b2CJR0DuH6gTaqtblZHETcHJ17zrP4/pub?gid=0&single=true&output=csv'

const normalizeHeader = (header: string) => header.trim().toLowerCase().replace(/[^a-z0-9]/g, '')

const parseCsv = (csv: string): Opportunity[] => {
  const rows: string[] = []
  let row = ''
  let insideQuotes = false

  for (const character of csv) {
    if (character === '"') insideQuotes = !insideQuotes
    if (character === '\n' && !insideQuotes) {
      rows.push(row.replace(/\r$/, ''))
      row = ''
    } else {
      row += character
    }
  }
  if (row) rows.push(row.replace(/\r$/, ''))
  if (rows.length < 2) return []

  const parseRow = (value: string) => {
    const values: string[] = []
    let field = ''
    let quoted = false

    for (let index = 0; index < value.length; index += 1) {
      const character = value[index]
      if (character === '"' && value[index + 1] === '"' && quoted) {
        field += '"'
        index += 1
      } else if (character === '"') {
        quoted = !quoted
      } else if (character === ',' && !quoted) {
        values.push(field.trim())
        field = ''
      } else {
        field += character
      }
    }
    values.push(field.trim())
    return values
  }

  const headers = parseRow(rows[0]).map(normalizeHeader)
  const valueFor = (values: string[], names: string[]) => values[headers.findIndex((header) => names.includes(header))] || ''

  return rows.slice(1).map((row, index) => {
    const values = parseRow(row)
    const title = valueFor(values, ['title', 'role', 'jobtitle'])
    const url = valueFor(values, ['url', 'link', 'joburl'])
    const isArchived = ['yes', 'true', '1'].includes(valueFor(values, ['isarchived', 'archived']).toLowerCase())
    return {
      id: valueFor(values, ['id', 'jobid', 'opportunityid']) || `${title}-${url}-${index}`,
      title,
      company: valueFor(values, ['company', 'organization', 'employer']),
      source: valueFor(values, ['source', 'jobsource']),
      isArchived,
      date: valueFor(values, ['date', 'posted', 'posteddate', 'dateadded', 'addeddate', 'createdat', 'published', 'publishedat']),
      type: valueFor(values, ['type', 'employmenttype']),
      location: valueFor(values, ['location', 'place']),
      detail: valueFor(values, ['detail', 'description', 'notes']),
      url,
    }
  }).filter((opportunity) => opportunity.title)
}

function Careers() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(fallbackOpportunities)
  const [applied, setApplied] = useState<Record<string, boolean>>({})
  const [session, setSession] = useState<Session | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'all' | 'open' | 'applied'>('all')
  const [isLoading, setIsLoading] = useState(Boolean(careersCsvUrl))
  const [loadError, setLoadError] = useState('')
  const [isUsingFallback, setIsUsingFallback] = useState(!careersCsvUrl)

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setAuthLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!supabase || !session) {
      setApplied({})
      return
    }

    supabase.from('applications').select('job_id, applied').then(({ data, error }) => {
      if (error) {
        setAuthError(error.message)
        return
      }
      setApplied(Object.fromEntries((data || []).map((row) => [row.job_id, row.applied])))
    })
  }, [session])

  useEffect(() => {
    fetch(`${careersCsvUrl}${careersCsvUrl.includes('?') ? '&' : '?'}t=${Date.now()}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Sheet request failed with ${response.status}`)
        return response.text()
      })
      .then((csv) => {
        const sheetOpportunities = parseCsv(csv)
        if (!sheetOpportunities.length) throw new Error('The sheet did not contain any rows with a title.')
        setOpportunities(sheetOpportunities)
        setIsUsingFallback(false)
      })
      .catch(() => setLoadError('Could not load the Google Sheet. Showing the local fallback list.'))
      .finally(() => setIsLoading(false))
  }, [])

  const filteredOpportunities = useMemo(() => opportunities
    .filter((opportunity) => {
      const matchesQuery = `${opportunity.title} ${opportunity.company} ${opportunity.source}`.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = status === 'all' || (status === 'applied' ? applied[opportunity.id] : !applied[opportunity.id])
      return matchesQuery && matchesStatus
    })
    .sort((first, second) => {
      const firstTime = Date.parse(first.date)
      const secondTime = Date.parse(second.date)
      if (Number.isNaN(firstTime)) return Number.isNaN(secondTime) ? 0 : 1
      if (Number.isNaN(secondTime)) return -1
      return secondTime - firstTime
    }), [applied, opportunities, query, status])

  const appliedCount = Object.values(applied).filter(Boolean).length

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!supabase) return
    setAuthError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setAuthError(error.message)
  }

  const toggleApplied = async (jobId: string) => {
    if (!supabase || !session) return
    const nextApplied = !applied[jobId]
    setApplied((current) => ({ ...current, [jobId]: nextApplied }))
    const { error } = await supabase.from('applications').upsert({
      user_id: session.user.id,
      job_id: jobId,
      applied: nextApplied,
      updated_at: new Date().toISOString(),
    })
    if (error) {
      setApplied((current) => ({ ...current, [jobId]: !nextApplied }))
      setAuthError(error.message)
    }
  }

  if (!isSupabaseConfigured) {
    return <section className="mx-auto max-w-2xl rounded-3xl border border-accent/30 bg-surface/80 p-8 text-center shadow-glow sm:p-10">
      <p className="text-sm uppercase tracking-[0.32em] text-accent">Private career tracker</p>
      <h1 className="mt-4 text-3xl font-semibold text-fg">Supabase is not configured</h1>
      <p className="mt-4 text-sm leading-7 text-muted">This page is locked until the Supabase URL and anon key are added to the deployment environment. No unauthenticated visitor can access the tracker.</p>
    </section>
  }

  if (authLoading) return <section className="rounded-3xl border border-panel bg-surface/80 p-10 text-center text-muted">Checking your secure session...</section>

  if (!session) {
    return <section className="mx-auto max-w-md rounded-3xl border border-panel bg-surface/80 p-8 shadow-glow sm:p-10">
      <p className="text-sm uppercase tracking-[0.32em] text-accent">Private career tracker</p>
      <h1 className="mt-4 text-3xl font-semibold text-fg">Sign in to continue</h1>
      <p className="mt-3 text-sm leading-6 text-muted">Only the authorized account can view and update application statuses.</p>
      <form onSubmit={signIn} className="mt-8 space-y-4">
        <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="w-full rounded-2xl border border-panel bg-bg px-4 py-3 text-fg outline-none focus:border-accent" />
        <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="w-full rounded-2xl border border-panel bg-bg px-4 py-3 text-fg outline-none focus:border-accent" />
        <button type="submit" className="w-full rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-bg transition hover:bg-accentLight">Sign in</button>
      </form>
      {authError && <p className="mt-4 text-sm leading-6 text-accent">{authError}</p>}
    </section>
  }

  return (
    <section className="space-y-10 pb-6">
      <div className="rounded-3xl border border-panel bg-surface/80 p-8 shadow-glow sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.32em] text-accent">Personal Career Tracker</p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
              Every opportunity, organized in one place.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted">
              Collect security roles from across the web, keep the original source close, and track which opportunities you have already applied to.
            </p>
          </div>

          <div className="rounded-3xl border border-accent/20 bg-bg/80 p-6">
            <div className="flex items-center gap-3 text-accent">
              <BriefcaseBusiness size={20} />
              <span className="text-sm uppercase tracking-[0.3em]">Application progress</span>
            </div>
            <p className="mt-5 text-4xl font-semibold text-fg">{appliedCount}<span className="text-xl text-muted"> / {opportunities.length}</span></p>
            <div className="mt-2 flex items-center justify-between gap-4 text-sm text-muted">
              <p>opportunities marked as applied</p>
              <button type="button" onClick={() => supabase?.auth.signOut()} className="text-accent hover:text-accentLight">Sign out</button>
            </div>
          </div>
        </div>
        {isLoading && <p className="mt-6 text-sm text-muted">Loading opportunities from Google Sheets...</p>}
        {isUsingFallback && !isLoading && <p className="mt-6 rounded-2xl border border-dashed border-accent/50 bg-accent/10 p-4 text-sm leading-6 text-accent">Sample data is shown below. Job details from the Google Sheet are not available right now, so this sample opportunity does not represent a real opening.</p>}
        {loadError && <p className="mt-6 text-sm text-accent">{loadError}</p>}
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-accent">Opportunity list</p>
            <h2 className="mt-2 text-2xl font-semibold text-fg">{isUsingFallback ? 'Sample Data' : 'Roles collected from around the web'}</h2>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-3xl border border-panel bg-bg/70 p-4 sm:flex-row">
          <label className="flex flex-1 items-center gap-3 rounded-2xl bg-surface/80 px-4 py-3 text-sm text-muted">
            <Search size={17} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search roles, companies, or sources" className="w-full bg-transparent text-fg outline-none placeholder:text-muted" />
          </label>
          <label className="flex items-center gap-3 rounded-2xl bg-surface/80 px-4 py-3 text-sm text-muted">
            <Filter size={17} />
            <select value={status} onChange={(event) => setStatus(event.target.value as typeof status)} className="bg-transparent text-fg outline-none">
              <option value="all">All opportunities</option>
              <option value="open">Not applied</option>
              <option value="applied">Applied</option>
            </select>
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredOpportunities.map((opportunity) => (
            <article key={opportunity.id} className={`flex min-w-0 flex-col rounded-3xl border p-6 transition ${isUsingFallback ? 'border-dashed border-accent/60 bg-accent/5' : 'border-panel bg-surface/80 hover:border-accent/40 hover:bg-surface'}`}>
              <div className="flex-1">
                <div className="space-y-3">
                  <h3 className="break-words text-xl font-semibold leading-tight text-fg">{opportunity.title}</h3>
                  <p className="break-words text-sm leading-6 text-accent">{opportunity.company} · {opportunity.source}</p>
                  <div className="flex flex-wrap gap-2 border-t border-panel pt-3">
                    <span className={`inline-flex max-w-full rounded-full px-3 py-1 text-xs uppercase leading-5 tracking-[0.2em] ${opportunity.isArchived ? 'bg-panel text-muted' : 'bg-accent/15 text-accent'}`}>
                      {opportunity.isArchived ? 'Expired' : 'Live'}
                    </span>
                    <span className={`inline-flex max-w-full rounded-full px-3 py-1 text-xs uppercase leading-5 tracking-[0.2em] ${applied[opportunity.id] ? 'bg-accent/15 text-accent' : 'bg-panel text-muted'}`}>
                      {applied[opportunity.id] ? 'Applied' : 'Not applied'}
                    </span>
                  </div>
                </div>
                <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-muted">
                  <MapPin size={16} /> {opportunity.location} · {opportunity.type}
                </p>
                <p className="mt-5 text-sm leading-6 text-muted">{opportunity.detail}</p>
              </div>
              <div className="mt-6 flex flex-col gap-3 border-t border-panel pt-5">
                <a href={opportunity.url} target="_blank" rel="noreferrer" aria-disabled={isUsingFallback} onClick={(event) => { if (isUsingFallback) event.preventDefault() }} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-panel px-4 py-2 text-center text-sm font-semibold text-fg transition hover:border-accent/40 hover:text-accent">
                  View source <ExternalLink size={16} />
                </a>
                <button type="button" onClick={() => toggleApplied(opportunity.id)} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-2 text-center text-sm font-semibold text-bg transition hover:bg-accentLight">
                  <Check size={16} /> {applied[opportunity.id] ? 'Mark not applied' : 'Mark as applied'}
                </button>
              </div>
            </article>
          ))}
          {filteredOpportunities.length === 0 && <p className="rounded-3xl border border-panel bg-surface/80 p-8 text-center text-sm text-muted">No opportunities match this filter.</p>}
          {authError && <p className="text-sm text-accent">{authError}</p>}
        </div>
      </div>

      <div className="rounded-3xl border border-panel bg-bg/70 p-8 text-center sm:p-10">
        <p className="text-sm uppercase tracking-[0.32em] text-accent">Your job search workspace</p>
        <h2 className="mt-3 text-2xl font-semibold text-fg">Keep every application visible and easy to revisit.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted">
          Add opportunities as you find them, use the source link when you are ready to apply, then update the status here.
        </p>
      </div>
    </section>
  )
}

export default Careers
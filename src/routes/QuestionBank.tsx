import { useEffect, useMemo, useState } from 'react'
import { BookOpen, CalendarDays, Filter, Search, ShieldCheck } from 'lucide-react'

type QuestionBankKind = 'pentesting' | 'red-teaming'

type Question = {
  id: string
  category: string
  question: string
  answer: string
  difficulty: string
  tags: string
  updatedAt: string
  source: string
}

const sheetUrls: Record<QuestionBankKind, string> = {
  pentesting: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT7M3jX2zR3OFRYPL8OQmZDrTFiUvhgAMqmAef3aI0JbsW7U4b2CJR0DuH6gTaqtblZHETcHJ17zrP4/pub?gid=1808170042&single=true&output=csv',
  'red-teaming': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT7M3jX2zR3OFRYPL8OQmZDrTFiUvhgAMqmAef3aI0JbsW7U4b2CJR0DuH6gTaqtblZHETcHJ17zrP4/pub?gid=1017051488&single=true&output=csv',
}

const pageDetails: Record<QuestionBankKind, { eyebrow: string; title: string; description: string }> = {
  pentesting: {
    eyebrow: 'Interview Preparation / PT',
    title: 'Penetration testing questions and answers',
    description: 'A searchable study bank for penetration testing fundamentals, practical techniques, and reporting decisions.',
  },
  'red-teaming': {
    eyebrow: 'Interview Preparation / Red Team',
    title: 'Red teaming questions and answers',
    description: 'A focused study bank for adversary simulation, tradecraft, operations, and the judgment behind effective red team engagements.',
  },
}

const normalizeHeader = (header: string) => header.trim().toLowerCase().replace(/[^a-z0-9]/g, '')

const parseCsv = (csv: string): string[][] => {
  const rows: string[][] = []
  let values: string[] = []
  let value = ''
  let quoted = false

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index]
    if (character === '"' && csv[index + 1] === '"' && quoted) {
      value += '"'
      index += 1
    } else if (character === '"') {
      quoted = !quoted
    } else if (character === ',' && !quoted) {
      values.push(value.trim())
      value = ''
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && csv[index + 1] === '\n') index += 1
      values.push(value.trim())
      if (values.some(Boolean)) rows.push(values)
      values = []
      value = ''
    } else {
      value += character
    }
  }

  if (value || values.length) {
    values.push(value.trim())
    if (values.some(Boolean)) rows.push(values)
  }
  return rows
}

const parseQuestions = (csv: string): Question[] => {
  const rows = parseCsv(csv)
  if (rows.length < 2) return []

  const headers = rows[0].map(normalizeHeader)
  const valueFor = (values: string[], names: string[]) => values[headers.findIndex((header) => names.includes(header))] || ''

  return rows.slice(1).map((values, index) => {
    const question = valueFor(values, ['question', 'prompt', 'interviewquestion'])
    const answer = valueFor(values, ['answer', 'response', 'explanation', 'solution'])
    const source = valueFor(values, ['source', 'reference', 'link', 'url'])
    return {
      id: valueFor(values, ['id', 'questionid']) || `${question}-${index}`,
      category: valueFor(values, ['category', 'topic', 'domain']) || 'General',
      question,
      answer,
      difficulty: valueFor(values, ['difficulty', 'level']),
      tags: valueFor(values, ['tags', 'tag', 'keywords']),
      updatedAt: valueFor(values, ['updatedat', 'updated', 'date', 'lastupdated', 'publishedat']),
      source,
    }
  }).filter((item) => item.question && item.answer)
}

const toCsvUrl = (url: string) => url.replace('/pubhtml?', '/pub?').replace(/&output=[^&]+/, '&output=csv')

function QuestionBank({ kind }: { kind: QuestionBankKind }) {
  const details = pageDetails[kind]
  const [questions, setQuestions] = useState<Question[]>([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const sourceUrl = toCsvUrl(sheetUrls[kind])
    fetch(`${sourceUrl}${sourceUrl.includes('?') ? '&' : '?'}t=${Date.now()}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Spreadsheet request failed with ${response.status}`)
        return response.text()
      })
      .then((csv) => {
        const parsed = parseQuestions(csv)
        if (!parsed.length) throw new Error('The sheet did not contain question and answer rows.')
        setQuestions(parsed)
      })
      .catch(() => setError('The spreadsheet could not be loaded. Check that it is published to the web and includes the suggested field names.'))
      .finally(() => setIsLoading(false))
  }, [kind])

  const categories = useMemo(() => ['all', ...new Set(questions.map((item) => item.category))], [questions])
  const visibleQuestions = useMemo(() => questions
    .filter((item) => category === 'all' || item.category === category)
    .filter((item) => `${item.question} ${item.answer} ${item.category} ${item.tags}`.toLowerCase().includes(query.toLowerCase()))
    .sort((first, second) => {
      const firstTime = Date.parse(first.updatedAt)
      const secondTime = Date.parse(second.updatedAt)
      if (Number.isNaN(firstTime)) return Number.isNaN(secondTime) ? 0 : 1
      if (Number.isNaN(secondTime)) return -1
      return secondTime - firstTime
    }), [category, questions, query])

  return (
    <section className="space-y-8 pb-6">
      <div className="rounded-3xl border border-panel bg-surface/80 p-8 shadow-glow sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.32em] text-accent">{details.eyebrow}</p>
            <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">{details.title}</h1>
            <p className="text-base leading-8 text-muted">{details.description}</p>
          </div>
          <div className="rounded-3xl border border-accent/20 bg-bg/80 p-5 text-sm text-muted">
            <div className="flex items-center gap-3 text-accent"><ShieldCheck size={18} /><span>Study bank</span></div>
            <p className="mt-3 text-2xl font-semibold text-fg">{questions.length}</p>
            <p>published questions</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-3xl border border-panel bg-bg/70 p-4 sm:flex-row">
          <label className="flex flex-1 items-center gap-3 rounded-2xl bg-surface/80 px-4 py-3 text-sm text-muted">
            <Search size={17} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search questions, answers, or topics" className="w-full bg-transparent text-fg outline-none placeholder:text-muted" />
          </label>
          <label className="flex items-center gap-3 rounded-2xl bg-surface/80 px-4 py-3 text-sm text-muted">
            <Filter size={17} />
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="bg-transparent text-fg outline-none">
              {categories.map((item) => <option key={item} value={item}>{item === 'all' ? 'All topics' : item}</option>)}
            </select>
          </label>
        </div>

        {isLoading && <p className="mt-8 text-sm text-muted">Loading questions from Google Sheets...</p>}
        {error && <p className="mt-8 rounded-2xl border border-dashed border-accent/50 bg-accent/10 p-4 text-sm leading-6 text-accent">{error}</p>}
        {!isLoading && !error && (
          <div className="mt-8 space-y-5">
            {visibleQuestions.map((item, index) => (
              <article key={item.id} className="rounded-3xl border border-panel bg-bg/70 p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="text-sm font-semibold text-accent">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-muted">{item.category}</p>
                      <h2 className="mt-2 text-xl font-semibold text-fg">{item.question}</h2>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-muted">
                    {item.difficulty && <span className="rounded-full bg-panel px-3 py-1">{item.difficulty}</span>}
                    {item.updatedAt && <span className="inline-flex items-center gap-1 rounded-full bg-panel px-3 py-1"><CalendarDays size={13} />{item.updatedAt}</span>}
                  </div>
                </div>
                <div className="mt-5 rounded-2xl bg-surface/80 p-5">
                  <div className="flex items-center gap-3 text-accent"><BookOpen size={16} /><span className="text-xs uppercase tracking-[0.24em]">Answer</span></div>
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted">{item.answer}</p>
                </div>
                {item.tags && <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted">{item.tags}</p>}
              </article>
            ))}
            {!visibleQuestions.length && <p className="rounded-3xl border border-panel bg-surface/80 p-8 text-center text-sm text-muted">No questions match this filter.</p>}
          </div>
        )}
      </div>
    </section>
  )
}

export default QuestionBank
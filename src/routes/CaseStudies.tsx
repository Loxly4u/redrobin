import { useMemo, useState } from 'react'
import { ChevronRight, CircleDot, FileText, ShieldAlert, Terminal } from 'lucide-react'

const studyData = [
  {
    id: 'fintech-api',
    title: 'Fintech API Authorization Audit',
    summary: [
      'Broken object-level authorization exposed customer account data across business lines.',
      'Unauthenticated JWT validation flaws could allow privilege escalation and transaction manipulation.',
      'Recommended remediation: enforce strict resource-level ACLs, rotate signing keys, and centralize JWT validation.',
    ],
    technical: [
      'GET /api/accounts/2345 HTTP/1.1\nHost: api.fintech.example\nAuthorization: Bearer <jwt>',
      'Response 200 OK — returned account details for mismatched customer IDs due to object ID validation bypass.',
      'Sanitized PoC: modified request path to /api/accounts/1122 returned another user’s ledger and identity attributes.',
    ],
    tags: ['T0008 - Access Token Manipulation', 'T1068 - Exploitation for Privilege Escalation', 'T1621 - Multi-Factor Authentication Request']
  },
  {
    id: 'ad-kerberoasting',
    title: 'Active Directory Assumed Breach',
    summary: [
      'Kerberoasting of service accounts led to compromise of a privileged account token.',
      'Pivoting from a low-privileged endpoint to domain admin demonstrates a high-impact lateral movement path.',
      'Recommended remediation: enforce service account rotation, monitor Kerberos ticket requests, and harden delegation policies.',
    ],
    technical: [
      'Request: ldapsearch -x -H ldap://dc1.corp.example -b \\"CN=Users,DC=corp,DC=example\\" (servicePrincipalName=*)',
      'Obtained TGS tickets for accounts with servicePrincipalName and cracked hashes offline, then used impersonation to access domain controllers.',
      'Validated remediation: strong account restrictions and detection rules blocked ticket requests from non-privileged hosts.',
    ],
    tags: ['T1558 - Steal or Forge Kerberos Tickets', 'T1110 - Brute Force', 'T1210 - Exploitation of Remote Services']
  },
  {
    id: 'external-perimeter',
    title: 'External Perimeter Recon',
    summary: [
      'OSINT discovered stale DNS records, subdomains, and exposed cloud metadata endpoints.',
      'Subdomain takeover risk through unused provider-hosted assets could enable phishing and C2 infrastructure.',
      'Recommended remediation: validate DNS ownership, decommission stale assets, and inventory all internet-facing endpoints.',
    ],
    technical: [
      'Enumeration: amass enum -d example.com --passive --json findings.json',
      'Identified forgotten asset at api-dev.example.com with dangling CNAME to expired cloud application.',
      'Proof: submitted invalid host header and confirmed takeover vector on provider-managed endpoint.',
    ],
    tags: ['T1590 - Gather Victim Network Information', 'T1588 - Obtain Capabilities', 'T1584 - Compromise Infrastructure']
  }
]

function ModeBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
      {label}
    </span>
  )
}

function CaseStudies() {
  const [selectedId, setSelectedId] = useState('fintech-api')
  const [viewMode, setViewMode] = useState<'executive' | 'technical'>('executive')

  const activeStudy = useMemo(() => studyData.find((item) => item.id === selectedId) ?? studyData[0], [selectedId])

  return (
    <section className="space-y-10 pb-6">
      <div className="rounded-3xl border border-panel bg-surface/80 p-8 shadow-glow sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.32em] text-accent">Case Studies</p>
            <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">De-identified mock client reports with executive and technical reporting modes</h1>
          </div>
          <div className="inline-flex gap-3 rounded-3xl border border-panel bg-bg/80 p-3">
            <button
              type="button"
              onClick={() => setViewMode('executive')}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                viewMode === 'executive' ? 'bg-accent/15 text-accentLight' : 'text-muted hover:text-fg'
              }`}
            >
              Executive
            </button>
            <button
              type="button"
              onClick={() => setViewMode('technical')}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                viewMode === 'technical' ? 'bg-accent/15 text-accentLight' : 'text-muted hover:text-fg'
              }`}
            >
              Technical
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="space-y-4 rounded-3xl border border-panel bg-bg/70 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-muted">Study list</p>
            <div className="space-y-3">
              {studyData.map((study) => (
                <button
                  key={study.id}
                  type="button"
                  onClick={() => setSelectedId(study.id)}
                  className={`flex w-full items-start gap-3 rounded-3xl border px-4 py-4 text-left transition ${
                    selectedId === study.id
                      ? 'border-accent/40 bg-accent/10 text-fg'
                      : 'border-panel bg-surface/80 text-muted hover:border-accent/40 hover:bg-surface'
                  }`}
                >
                  <CircleDot className="mt-1 text-accent" size={18} />
                  <div>
                    <p className="font-semibold">{study.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">Real-world vulnerability themes with business risk and remediation guidance.</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 rounded-3xl border border-panel bg-bg/70 p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-accent">Active report</p>
                <h2 className="mt-2 text-3xl font-semibold text-fg">{activeStudy.title}</h2>
              </div>
              <div className="inline-flex flex-wrap gap-2">
                {activeStudy.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-surface/90 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-panel bg-surface/80 p-6">
              {viewMode === 'executive' ? (
                <div className="space-y-4">
                  {activeStudy.summary.map((point) => (
                    <div key={point} className="rounded-2xl bg-bg/95 p-4">
                      <div className="flex items-center gap-3 text-accent">
                        <FileText size={16} />
                        <span className="text-sm uppercase tracking-[0.28em] text-accent">Business impact</span>
                      </div>
                      <p className="mt-3 text-muted">{point}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {activeStudy.technical.map((line) => (
                    <pre key={line} className="overflow-x-auto rounded-2xl bg-bg/95 p-4 text-sm leading-6 text-muted">
                      {line}
                    </pre>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-panel bg-surface/80 p-6">
              <div className="flex items-center justify-between text-muted">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={16} />
                  <span className="text-sm uppercase tracking-[0.28em]">Decision support</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-bg/80 px-3 py-1 text-xs uppercase tracking-[0.26em] text-muted">
                  {viewMode === 'executive' ? 'Executive' : 'Technical'} mode
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">
                Toggle between a high-level briefing for leadership and an engineering-ready technical deep dive that contains sanitized vulnerability artifacts and attack path context.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CaseStudies

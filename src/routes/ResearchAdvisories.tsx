import { Award, BookOpen, ShieldCheck } from 'lucide-react'

const advisories = [
  { id: 'cve-2024-3050', label: 'CVE-2024-3050', vendor: 'Cloud API Provider', cvss: '9.1', status: 'Published' },
  { id: 'cve-2024-4021', label: 'CVE-2024-4021', vendor: 'Enterprise App Framework', cvss: '8.4', status: 'Under review' },
  { id: 'cve-2024-5112', label: 'CVE-2024-5112', vendor: 'Identity Service', cvss: '7.8', status: 'Mitigated' },
]

const bountyHall = [
  { program: 'HackerOne - FinTech', recognition: 'Sanitized acknowledgement for BOLA and session fixation insights.' },
  { program: 'Bugcrowd - SaaS Platform', recognition: 'Top submission for API misconfiguration and chain exploitation.' },
  { program: 'Synack - Global Retail', recognition: 'Validated exploit path for cloud misconfiguration and data exposure.' },
]

const deepDives = [
  { title: 'API Authorization Analytics: Authorization Boundary Enforcement', description: 'A technical paper on object-level access decisions, token validation, and policy enforcement at scale.' },
  { title: 'Kerberos Resilience in Hybrid AD Sets', description: 'Analysis of Kerberoasting detection, service account controls, and privileged ticket hardening.' },
  { title: 'Subdomain Ownership and Cloud Asset Hygiene', description: 'Operational guidance for DNS provenance, takeover detection, and perimeter asset management.' },
]

function ResearchAdvisories() {
  return (
    <section className="space-y-10 pb-6">
      <div className="rounded-3xl border border-panel bg-surface/80 p-8 shadow-glow sm:p-10">
        <div className="space-y-4 text-muted">
          <p className="text-sm uppercase tracking-[0.32em] text-accent">Proof of Discovery</p>
          <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">Research, CVE disclosures, and vulnerability advisories</h1>
          <p className="max-w-3xl text-base leading-8 text-muted">
            Browse curated disclosures, top hall of fame acknowledgements, and technical advisories that highlight offensive research and security findings.
          </p>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl border border-panel bg-bg/80 p-6">
            <div className="flex items-center gap-3 text-accent">
              <ShieldCheck size={20} />
              <span className="text-sm uppercase tracking-[0.3em]">CVE Disclosures</span>
            </div>
            <div className="mt-6 space-y-4">
              {advisories.map((item) => (
                <div key={item.id} className="rounded-2xl bg-surface/80 p-4">
                  <p className="text-sm font-semibold text-fg">{item.label}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-muted">{item.vendor}</p>
                  <div className="mt-3 flex items-center justify-between text-sm text-muted">
                    <span>CVSS {item.cvss}</span>
                    <span>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-panel bg-bg/80 p-6">
            <div className="flex items-center gap-3 text-accent">
              <Award size={20} />
              <span className="text-sm uppercase tracking-[0.3em]">Bug Bounty Hall of Fame</span>
            </div>
            <div className="mt-6 space-y-4">
              {bountyHall.map((item) => (
                <div key={item.program} className="rounded-2xl bg-surface/80 p-4">
                  <p className="font-semibold text-fg">{item.program}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.recognition}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-panel bg-bg/80 p-6">
            <div className="flex items-center gap-3 text-accent">
              <BookOpen size={20} />
              <span className="text-sm uppercase tracking-[0.3em]">Vulnerability Deep Dives</span>
            </div>
            <div className="mt-6 space-y-4">
              {deepDives.map((item) => (
                <div key={item.title} className="rounded-2xl bg-surface/80 p-4">
                  <p className="font-semibold text-fg">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResearchAdvisories

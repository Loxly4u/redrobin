import { ArrowRight, ShieldAlert, Sparkles, Terminal } from 'lucide-react'

const capabilities = [
  { label: 'Web Applications', detail: 'API control authorization, session hardening, and OWASP risk reduction.' },
  { label: 'Active Directory', detail: 'Assumed breach modeling, credential harvesting, and lateral movement validation.' },
  { label: 'Cloud Security', detail: 'Privilege escalation in AWS/Azure, identity-safe automation, and governance testing.' },
]

const highlights = [
  { title: 'Fintech API Authorization Audit', brief: 'Broken object-level authorization, JWT misuse, and secure token governance.', href: '/case-studies' },
  { title: 'Kerberoasting AD Campaign', brief: 'Assumed breach attack path culminating in domain admin escalation.', href: '/case-studies' },
  { title: 'Recon Automation Toolkit', brief: 'Custom tooling for surface discovery, fingerprinting, and attack cadence orchestration.', href: '/arsenal' },
]

function Home() {
  return (
    <section className="space-y-10 pb-6">
      <div className="rounded-3xl border border-panel bg-surface/80 p-8 shadow-glow sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr] lg:items-end">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.32em] text-accent">
              Offensive Security Portfolio</span>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
              Offensive Security Consultant specializing in Adversarial Emulation & Red Teaming
            </h1>
            <p className="max-w-2xl text-muted">
              Delivering enterprise-ready assessments that map technical vulnerabilities to business risk, enable executive decision-making, and validate remediation with real attack simulations.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-panel bg-bg/70 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-muted">Delivery Model</p>
                <p className="mt-3 text-lg font-medium text-fg">Structured engagements with tailored threat models, executive reporting, and technical verification.</p>
              </div>
              <div className="rounded-2xl border border-panel bg-bg/70 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-muted">Value Proposition</p>
                <p className="mt-3 text-lg font-medium text-fg">Accelerate secure release cycles while preserving compliance posture and attack surface visibility.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-accent/20 bg-bg p-6 shadow-lg shadow-glow">
            <div className="flex items-center justify-between text-sm uppercase tracking-[0.28em] text-accent">
              <span>Capability Matrix</span>
              <span className="text-muted">Enterprise focus</span>
            </div>
            <div className="mt-6 space-y-4">
              {capabilities.map((item) => (
                <div key={item.label} className="rounded-2xl bg-surface/90 p-4">
                  <p className="text-sm font-semibold text-fg">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="group rounded-3xl border border-panel bg-surface/80 p-6 transition hover:border-accent/40 hover:bg-surface">
            <div className="flex items-center justify-between text-muted">
              <span className="text-xs uppercase tracking-[0.3em]">Pinned Highlight</span>
              <ShieldAlert size={18} className="text-accent" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-fg">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{item.brief}</p>
            <a href={item.href} className="mt-6 inline-flex items-center gap-2 text-accent transition hover:text-accentLight">
              Review details <ArrowRight size={16} />
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Home

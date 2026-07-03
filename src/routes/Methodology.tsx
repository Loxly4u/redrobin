import { ArrowRight, GitBranch, ShieldCheck, Terminal } from 'lucide-react'

const phases = [
  {
    title: 'Scoping & Threat Modeling',
    description: 'Define business objectives, attack surface, and control gaps using MITRE ATT&CK, STRIDE, and risk profiling.',
    icon: ShieldCheck,
  },
  {
    title: 'Execution Frameworks',
    description: 'Apply PTES, OWASP Top 10, and MITRE ATT&CK mapping for web, identity, and cloud intrusion scenarios.',
    icon: GitBranch,
  },
  {
    title: 'Remediation & Validation',
    description: 'Collaborate with engineering and security teams to verify fixes, conduct purple team validation, and harden detections.',
    icon: Terminal,
  },
]

function Methodology() {
  return (
    <section className="space-y-10 pb-6">
      <div className="rounded-3xl border border-panel bg-surface/80 p-8 shadow-glow sm:p-10">
        <div className="space-y-4 text-muted">
          <p className="text-sm uppercase tracking-[0.32em] text-accent">How You Work</p>
          <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">Structured adversary simulation from strategy through validation</h1>
          <p className="max-w-3xl text-base leading-8 text-muted">
            Engagements center around measurable business outcomes, repeatable execution standards, and remediation verification that improves both resilience and detection.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {phases.map((phase, index) => {
            const Icon = phase.icon
            return (
              <div key={phase.title} className="grid gap-6 rounded-3xl border border-panel bg-bg/70 p-6 sm:grid-cols-[auto_1fr] sm:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-accent/10 text-accent shadow-glow">
                  <Icon size={24} />
                </div>
                <div>
                  <span className="text-sm uppercase tracking-[0.24em] text-muted">Phase {index + 1}</span>
                  <h2 className="mt-3 text-2xl font-semibold text-fg">{phase.title}</h2>
                  <p className="mt-2 text-muted">{phase.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 rounded-3xl border border-panel bg-bg/80 p-6 sm:p-8">
          <div className="flex items-center justify-between text-muted">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Execution Design</p>
              <p className="mt-2 text-lg font-semibold text-fg">Tactical coverage across web, identity, and hybrid cloud.</p>
            </div>
            <ArrowRight size={20} className="text-accent" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-panel bg-surface/80 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">Standards</p>
              <p className="mt-3 text-sm text-muted">PTES, OWASP, NIST, MITRE ATT&CK</p>
            </div>
            <div className="rounded-2xl border border-panel bg-surface/80 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">Delivery</p>
              <p className="mt-3 text-sm text-muted">Executive briefings, remediation sprints, and technical verification.</p>
            </div>
            <div className="rounded-2xl border border-panel bg-surface/80 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">Outcome</p>
              <p className="mt-3 text-sm text-muted">Reduced attack surface, hardened controls, and better risk communication.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Methodology

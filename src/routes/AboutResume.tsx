import { ClipboardCheck, Download, GraduationCap, ShieldCheck, User } from 'lucide-react'

const experience = [
  { year: '2025', role: 'Senior Offensive Security Consultant', company: 'RedRobin Security', detail: 'Led enterprise red team campaigns, cloud privilege escalation assessments, and executive remediation reviews.' },
  { year: '2023', role: 'Lead Red Teamer', company: 'VectorGuard Labs', detail: 'Delivered hybrid AD and cloud attack simulations for financial services and healthcare customers.' },
  { year: '2021', role: 'Security Architect', company: 'BlueForge Cyber', detail: 'Built defensive control validation programs and mapped detection coverage to MITRE ATT&CK telemetry.' },
]

const expertise = [
  'Penetration Testing (VAPT)',
  'Application Security',
  'Active Directory',
  'Python',
  'Kali Linux',
  'Vulnerability Management',
  'Hardware Troubleshooting',
]

const education = [
  { label: 'B.S. Computer Science', institution: 'Cyber Defense Institute', year: '2019' },
  { label: 'Executive Risk Management', institution: 'Security Leadership Academy', year: '2022' },
]

const certifications = [
  { name: 'OSCP', link: 'https://www.credly.com/badges/sanitized', status: 'Active' },
  { name: 'PNPT', link: 'https://www.credly.com/badges/sanitized', status: 'Active' },
  { name: 'OSEP', link: 'https://www.credly.com/badges/sanitized', status: 'Active' },
  { name: 'CPTS', link: 'https://www.credly.com/badges/sanitized', status: 'Active' },
]

function AboutResume() {
  return (
    <section className="space-y-10 pb-6">
      <div className="rounded-3xl border border-panel bg-surface/80 p-8 shadow-glow sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.32em] text-accent">About & Resume</p>
            <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">Trusted offensive security leadership with practical enterprise delivery.</h1>
            <p className="max-w-3xl text-base leading-8 text-muted">
              Live interactive resume with professional timelines, certification validation, and secure contact channels designed for technical stakeholders and decision makers.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] text-accent">
              {expertise.map((skill) => (
                <span key={skill} className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-panel bg-bg/80 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-muted">Resume</p>
                <p className="mt-2 text-xl font-semibold text-fg">Download PDF</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-bg transition hover:bg-accentLight">
                <Download size={18} />
                Download
              </button>
            </div>
            <p className="mt-6 text-sm leading-6 text-muted">Sanitized portfolio resume tailored for secure briefing and due diligence during authorized red team engagements.</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl border border-panel bg-bg/80 p-6">
            <div className="flex items-center gap-3 text-accent">
              <User size={20} />
              <span className="text-sm uppercase tracking-[0.3em]">Experience Timeline</span>
            </div>
            <div className="mt-6 space-y-4">
              {experience.map((item) => (
                <div key={item.year} className="rounded-2xl bg-surface/80 p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-muted">{item.year}</p>
                  <p className="mt-2 font-semibold text-fg">{item.role}</p>
                  <p className="text-sm text-accent">{item.company}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-panel bg-bg/80 p-6">
            <div className="flex items-center gap-3 text-accent">
              <GraduationCap size={20} />
              <span className="text-sm uppercase tracking-[0.3em]">Education</span>
            </div>
            <div className="mt-6 space-y-4">
              {education.map((item) => (
                <div key={item.label} className="rounded-2xl bg-surface/80 p-4">
                  <p className="font-semibold text-fg">{item.label}</p>
                  <p className="mt-1 text-sm text-muted">{item.institution}, {item.year}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-panel bg-bg/80 p-6">
            <div className="flex items-center gap-3 text-accent">
              <ShieldCheck size={20} />
              <span className="text-sm uppercase tracking-[0.3em]">Certifications</span>
            </div>
            <div className="mt-6 space-y-4">
              {certifications.map((cert) => (
                <a key={cert.name} href={cert.link} className="block rounded-2xl bg-surface/80 p-4 text-fg transition hover:border-accent/40 hover:bg-surface">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{cert.name}</span>
                    <span className="text-sm text-accent">{cert.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">Credly verification link</p>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-panel bg-bg/80 p-8 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-panel bg-surface/80 p-6">
              <div className="flex items-center gap-3 text-accent">
                <ClipboardCheck size={20} />
                <span className="text-sm uppercase tracking-[0.3em]">Encrypted Contact</span>
              </div>
              <div className="mt-6 space-y-4 text-sm leading-6 text-muted">
                <div>
                  <p className="text-fg">PGP Public Key</p>
                  <pre className="mt-2 overflow-x-auto rounded-2xl bg-bg/90 p-4 text-xs text-muted">-----BEGIN PGP PUBLIC KEY BLOCK-----\n...sanitized-key...\n-----END PGP PUBLIC KEY BLOCK-----</pre>
                  <button className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-accent px-4 py-2 text-sm font-semibold text-bg hover:bg-accentLight">
                    Copy key
                  </button>
                </div>
                <div>
                  <p className="text-fg">Secure Contact</p>
                  <p className="mt-2 text-muted">Open to authorized collaboration, advisory engagements, and offensive security program delivery.</p>
                  <div className="mt-4 space-y-2 text-sm">
                    <a href="mailto:redrobin@redrobinsecurity.com" className="block text-accent hover:text-accentLight">redrobin@redrobinsecurity.com</a>
                    <a href="https://github.com/redrobin-security" target="_blank" rel="noreferrer" className="block text-accent hover:text-accentLight">github.com/redrobin-security</a>
                    <a href="https://linkedin.com/in/redrobin-security" target="_blank" rel="noreferrer" className="block text-accent hover:text-accentLight">linkedin.com/in/redrobin-security</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-panel bg-surface/80 p-6">
              <div className="text-sm uppercase tracking-[0.3em] text-accent">Professional verification</div>
              <p className="mt-4 text-muted">A secure portfolio should be complemented by strong, verifiable certification evidence and a clear path for authorized contact and remediation coordination.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutResume

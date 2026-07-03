import { Code2, Github, Layers } from 'lucide-react'

const tools = [
  {
    name: 'recon-automation-suite',
    description: 'Bash and Go tooling for attack surface discovery, subdomain mapping, and automated findings correlation.',
    language: 'Bash / Go',
    repo: 'https://github.com/sanitized/recon-automation-suite',
  },
  {
    name: 'burp-suite-extensions',
    description: 'Custom extensions for Burp Suite that automate bypasses, payload generation, and session validation.',
    language: 'Java / Python',
    repo: 'https://github.com/sanitized/burp-suite-extensions',
  },
  {
    name: 'post-exploitation-scripts',
    description: 'PowerShell and Python helpers for post-exploitation persistence, credential harvest, and lateral movement orchestration.',
    language: 'PowerShell / Python',
    repo: 'https://github.com/sanitized/post-exploitation-scripts',
  },
]

function Arsenal() {
  return (
    <section className="space-y-10 pb-6">
      <div className="rounded-3xl border border-panel bg-surface/80 p-8 shadow-glow sm:p-10">
        <div className="flex flex-col gap-4 text-muted sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-accent">Custom Tooling & Automation</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">Arsenal of operational scripts, plugins, and attack tooling</h1>
          </div>
          <div className="rounded-3xl border border-panel bg-bg/80 px-5 py-4 text-sm text-muted">
            <Code2 size={18} className="inline-block" />
            <span className="ml-2">Tooling designed for repeatable enterprise engagement delivery.</span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {tools.map((tool) => (
            <article key={tool.name} className="group rounded-3xl border border-panel bg-bg/70 p-6 transition hover:border-accent/40 hover:bg-surface">
              <div className="flex items-center gap-3 text-accent">
                <Layers size={20} />
                <span className="text-sm uppercase tracking-[0.24em]">{tool.language}</span>
              </div>
              <h2 className="mt-5 text-xl font-semibold text-fg">{tool.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{tool.description}</p>
              <a href={tool.repo} className="mt-6 inline-flex items-center gap-2 text-accent hover:text-accentLight">
                <Github size={16} />
                Repository
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Arsenal

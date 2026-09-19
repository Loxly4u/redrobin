import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/RedRobin.webp'
import { Cpu, ShieldCheck, Terminal, FileText, Database, Briefcase, BookOpen, Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', title: 'Home', icon: Cpu },
  { href: '/methodology', title: 'Methodology', icon: ShieldCheck },
  { href: '/case-studies', title: 'Case Studies', icon: FileText },
  { href: '/careers', title: 'Careers', icon: Briefcase },
  { href: '/research-and-advisories', title: 'Research', icon: Terminal },
  { href: '/arsenal', title: 'Arsenal', icon: Database },
  { href: '/pentest-checklist', title: 'Checklist', icon: ShieldCheck },
  { href: '/about-and-resume', title: 'About', icon: Briefcase },
  { href: '/pentest-questions', title: 'PT Q&A', icon: BookOpen },
  { href: '/red-team-questions', title: 'Red Team Q&A', icon: BookOpen },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-[#3f1420] bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex min-w-0 items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
          <img src={logo} alt="REDROBIN logo" className="h-10 w-10 shrink-0 rounded-full border border-accent/20 bg-surface p-1 shadow-glow object-cover sm:h-11 sm:w-11" />
          <span>REDROBIN</span>
        </Link>

        <nav className="hidden items-center gap-3 lg:flex">
          {navLinks.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                    isActive ? 'bg-panel text-accentLight shadow-glow' : 'text-muted hover:bg-panel hover:text-fg'
                  }`
                }
              >
                <Icon size={16} />
                {item.title}
              </NavLink>
            )
          })}
        </nav>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-panel text-fg transition hover:border-accent/50 hover:text-accent lg:hidden"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {isMenuOpen && (
          <nav id="mobile-navigation" className="order-3 grid basis-full gap-1 border-t border-panel pt-3 lg:hidden">
            {navLinks.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                      isActive ? 'bg-panel text-accentLight' : 'text-muted hover:bg-panel hover:text-fg'
                    }`
                  }
                >
                  <Icon size={17} />
                  {item.title}
                </NavLink>
              )
            })}
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header

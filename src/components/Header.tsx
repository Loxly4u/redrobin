import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/RedRobin.webp'
import { Cpu, ShieldCheck, Terminal, FileText, Database, Briefcase } from 'lucide-react'

const navLinks = [
  { href: '/', title: 'Home', icon: Cpu },
  { href: '/methodology', title: 'Methodology', icon: ShieldCheck },
  { href: '/case-studies', title: 'Case Studies', icon: FileText },
  { href: '/research-and-advisories', title: 'Research', icon: Terminal },
  { href: '/arsenal', title: 'Arsenal', icon: Database },
  { href: '/pentest-checklist', title: 'Checklist', icon: ShieldCheck },
  { href: '/about-and-resume', title: 'About', icon: Briefcase },
]

function Header() {
  return (
    <header className="border-b border-[#3f1420] bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
          <img src={logo} alt="REDROBIN logo" className="h-11 w-11 rounded-full border border-accent/20 bg-surface p-1 shadow-glow object-cover" />
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
      </div>
    </header>
  )
}

export default Header

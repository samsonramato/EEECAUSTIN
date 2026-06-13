import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navLinks } from '../data/site.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    [
      'relative px-3.5 py-2 rounded-lg font-semibold tracking-wide transition-colors',
      'after:absolute after:left-3.5 after:right-3.5 after:bottom-1 after:h-0.5 after:bg-gold',
      'after:origin-left after:transition-transform after:duration-300',
      isActive
        ? 'text-gold-dark after:scale-x-100'
        : 'text-navy hover:text-gold-dark after:scale-x-0 hover:after:scale-x-100',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md backdrop-saturate-150 shadow-[0_2px_8px_rgba(20,35,59,0.06)]">
      <div className="flex items-center justify-between gap-5 px-[clamp(20px,6vw,80px)] py-3.5">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/image/tag.png"
            alt="Ethiopian Emmanuel Evangelical Church logo"
            className="h-13 w-13 rounded-full object-cover border-2 border-gold shadow-[0_0_0_4px_rgba(201,162,75,0.12)]"
            style={{ height: 52, width: 52 }}
          />
          <span className="hidden sm:block font-serif font-bold text-navy leading-tight text-lg">
            Emmanuel <span className="text-gold-dark">Evangelical</span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={linkClass} end={l.to === '/'}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-navy text-2xl leading-none"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <i className={`fas ${open ? 'fa-xmark' : 'fa-bars'}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-line bg-white animate-rise">
          <ul className="flex flex-col py-2">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-[clamp(20px,6vw,40px)] py-3.5 font-semibold ${
                      isActive ? 'text-gold-dark bg-gold/10' : 'text-navy hover:bg-gold/10'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

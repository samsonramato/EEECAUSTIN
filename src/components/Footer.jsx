import { Link } from 'react-router-dom'
import { contact, navLinks } from '../data/site.js'

export default function Footer() {
  const headingClass =
    "font-serif text-lg text-white mb-4 pb-2.5 relative after:absolute after:left-0 after:bottom-0 after:w-9 after:h-0.5 after:bg-gold"

  return (
    <footer className="bg-navy text-white/80 pt-[clamp(48px,6vw,70px)] mt-10">
      <div className="container-wide grid gap-10 pb-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <h4 className={headingClass}>Church Address</h4>
          <p className="text-sm text-white/70 mb-3">{contact.address}</p>
          <iframe
            title="Church location map"
            src={contact.mapEmbed}
            className="w-full h-40 rounded-lg border-0 mt-2"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div>
          <h4 className={headingClass}>Contact Us</h4>
          <p className="text-sm text-white/70 mb-2">
            Email:{' '}
            <a href={`mailto:${contact.email}`} className="hover:text-gold">
              {contact.email}
            </a>
          </p>
          {contact.phones.map((p) => (
            <p key={p} className="text-sm text-white/70 mb-2">
              <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-gold">
                {p}
              </a>
            </p>
          ))}
        </div>

        <div>
          <h4 className={headingClass}>Follow Us</h4>
          <div className="flex gap-2.5">
            <a
              href={contact.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/15 text-white transition hover:bg-gold hover:text-navy hover:-translate-y-1"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/15 text-white transition hover:bg-gold hover:text-navy hover:-translate-y-1"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/15 text-white transition hover:bg-gold hover:text-navy hover:-translate-y-1"
            >
              <i className="fab fa-youtube" />
            </a>
          </div>
        </div>

        <div>
          <h4 className={headingClass}>Quick Links</h4>
          <ul className="space-y-2.5">
            {navLinks.slice(0, 4).map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-white/70 transition hover:text-gold hover:pl-1.5">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-wide border-t border-white/10 py-5.5 text-center text-sm text-white/60">
        <p>&copy; {new Date().getFullYear()} Ethiopian Emmanuel Evangelical Church, Austin. All rights reserved.</p>
      </div>
    </footer>
  )
}

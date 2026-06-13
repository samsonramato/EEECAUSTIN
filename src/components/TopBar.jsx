import { contact } from '../data/site.js'

export default function TopBar() {
  return (
    <div className="hidden md:block bg-navy text-white/80 text-[0.82rem]">
      <div className="flex items-center justify-between px-[clamp(20px,6vw,80px)] py-2">
        <div className="flex items-center gap-6">
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-gold transition-colors">
            <i className="fas fa-envelope text-gold" />
            {contact.email}
          </a>
          <a href={`tel:${contact.phones[0].replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-gold transition-colors">
            <i className="fas fa-phone text-gold" />
            {contact.phones[0]}
          </a>
          <span className="hidden lg:flex items-center gap-2">
            <i className="fas fa-location-dot text-gold" />
            Pflugerville, TX
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden lg:inline text-white/55">Follow us</span>
          <a href={contact.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-gold transition-colors">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-gold transition-colors">
            <i className="fab fa-instagram" />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-gold transition-colors">
            <i className="fab fa-youtube" />
          </a>
        </div>
      </div>
    </div>
  )
}

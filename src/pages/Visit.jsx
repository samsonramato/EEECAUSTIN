import { useEffect } from 'react'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import ServiceTimes from '../components/ServiceTimes.jsx'
import { contact } from '../data/site.js'

// Clean single-line address for display and map links. (contact.address in
// site.js is the longer form; the street really is "Immanuel Rd".)
const ADDRESS = '14400 Immanuel Rd, Pflugerville, TX 78660'
const DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(ADDRESS)

// What first-time visitors can expect. Copy below uses only what the site
// already states elsewhere (Amharic worship, fellowship over coffee, a
// children's ministry); anything unconfirmed is left as a placeholder below.
const expectations = [
  {
    icon: 'fa-hand-holding-heart',
    title: 'Come as You Are',
    desc: 'There is no dress code. Whether you arrive in traditional habesha clothing, a suit, or jeans, you will be welcomed as family.',
  },
  {
    icon: 'fa-dove',
    title: 'Worship in Amharic',
    desc: 'Our gatherings center on heartfelt worship, prayer, and the Word of God in Amharic. Eritrean, Tigrinya-speaking brothers and sisters are warmly welcome.',
  },
  {
    icon: 'fa-child',
    title: 'For Your Family',
    desc: 'Children are a blessing among us. Ask a greeter about our children’s ministry when you arrive and we’ll help your little ones feel at home.',
  },
  {
    icon: 'fa-mug-hot',
    title: 'Stay for Fellowship',
    desc: 'After Sunday worship, stay for coffee and fellowship — the best way to meet the family and feel at home in the community.',
  },
]

export default function Visit() {
  useEffect(() => {
    document.title =
      'Visit & Directions — Ethiopian Emmanuel Evangelical Church — Austin | Pflugerville, TX'
  }, [])

  return (
    <>
      <PageHero eyebrow="Plan your visit" title="Visit Us" />

      {/* Location + directions */}
      <section className="bg-soft-pattern">
        <div className="container-wide grid items-start gap-10 py-[clamp(48px,7vw,84px)] lg:grid-cols-2">
          <Reveal>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-gold">
              <span lang="am">እንኳን ደህና መጡ</span> · You are welcome here
            </p>
            <SectionHeading
              eyebrow=""
              title="Where to Find Us"
              center={false}
            />
            <p className="mt-4 max-w-md text-muted">
              We gather in Pflugerville, just north of Austin, and we’d love to
              welcome you and your family this week. Here is everything you need
              to find us and know what to expect.
            </p>

            <div className="card mt-7 space-y-5 p-7">
              <div className="flex items-start gap-4">
                <span className="icon-badge shrink-0">
                  <i className="fas fa-location-dot" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-navy">Address</h3>
                  <address className="not-italic text-muted">{ADDRESS}</address>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="icon-badge shrink-0">
                  <i className="fas fa-phone" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-navy">Call or Text</h3>
                  {contact.phones.map((p) => (
                    <p key={p} className="text-muted">
                      <a href={`tel:${p.replace(/\s/g, '')}`} className="transition hover:text-gold-dark">
                        {p}
                      </a>
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-gold"
                >
                  <i className="fas fa-diamond-turn-right" />
                  Get Directions
                </a>
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  <i className="fab fa-facebook" />
                  Message Us
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card overflow-hidden p-2.5">
              <iframe
                title={`Map to ${ADDRESS}`}
                src={contact.mapEmbed}
                className="h-[480px] w-full rounded-lg border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* What to expect */}
      <section>
        <div className="container-wide py-[clamp(48px,7vw,84px)]">
          <Reveal>
            <SectionHeading
              eyebrow="First time here?"
              title="What to Expect"
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {expectations.map((e, i) => (
              <Reveal key={e.title} delay={(i % 4) * 90}>
                <div className="card flex h-full flex-col items-center px-6 py-9 text-center">
                  <span className="icon-badge mb-5">
                    <i className={`fas ${e.icon}`} />
                  </span>
                  <h3 className="mb-2.5 font-serif text-lg font-bold text-navy">{e.title}</h3>
                  <p className="text-[0.95rem] text-muted">{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/*
            TODO (church office): confirm and replace the placeholders below with
            real details before launch — these are not assumptions we can make.
          */}
          <Reveal>
            <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-dashed border-gold/50 bg-cream/40 p-6 text-center text-sm text-muted">
              <p className="mb-1 font-semibold text-navy">
                <i className="fas fa-circle-info mr-2 text-gold-dark" />
                Good to know
              </p>
              <p>
                {/* TODO: confirm parking details */}
                Parking: <span className="italic">[add parking details — e.g. free on-site lot]</span>{' '}
                · {/* TODO: confirm accessibility */}
                Accessibility: <span className="italic">[add wheelchair / accessibility info]</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <ServiceTimes />
    </>
  )
}

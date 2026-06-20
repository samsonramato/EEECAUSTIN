import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import Welcome from '../components/Welcome.jsx'
import Values from '../components/Values.jsx'
import Gallery from '../components/Gallery.jsx'
import FacebookVideos from '../components/FacebookVideos.jsx'
import VisitCTA from '../components/VisitCTA.jsx'
import ServiceTimes from '../components/ServiceTimes.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import MinistryCard from '../components/MinistryCard.jsx'
import { ministries, faithAmharic, faithEnglish, contact } from '../data/site.js'

const sermonsPlaylist =
  'https://www.youtube.com/embed/videoseries?list=PL8KjhzsBXNmBLJYpihUjrzvkMvov_tvTT&modestbranding=1&rel=0'

export default function Home() {
  useEffect(() => {
    document.title =
      'Ethiopian Emmanuel Evangelical Church — Austin, Texas | Gospel & Evangelical Community'
  }, [])

  return (
    <>
      <Hero />

      <div id="welcome">
        <Welcome />
      </div>

      <Values />

      {/* Statement of Faith */}
      <section className="bg-soft-pattern">
        <div className="container-wide py-[clamp(48px,7vw,84px)]">
          <Reveal>
            <SectionHeading eyebrow="የእምነት መግለጫ" title="Statement of Faith" />
          </Reveal>

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            <Reveal>
              <article className="card h-full relative overflow-hidden p-[clamp(26px,4vw,40px)] before:absolute before:left-0 before:top-0 before:h-full before:w-[5px] before:bg-gradient-to-b before:from-gold before:to-gold-dark">
                <p className="text-[1.02rem] leading-[1.9] text-muted" lang="am">
                  {faithAmharic}
                </p>
                <Link to="/about" className="mt-4 inline-block font-semibold text-gold-dark hover:underline" lang="am">
                  የእምነት መግለጫን በዝርዝር ይመልከቱ.....
                </Link>
              </article>
            </Reveal>

            <Reveal delay={120}>
              <article className="card h-full relative overflow-hidden p-[clamp(26px,4vw,40px)] before:absolute before:left-0 before:top-0 before:h-full before:w-[5px] before:bg-gradient-to-b before:from-gold before:to-gold-dark">
                <p className="text-[1.02rem] leading-[1.9] text-muted">
                  <span className="font-serif font-bold text-navy">
                    Ethiopian Emmanuel Evangelical Church in Austin, Texas,
                  </span>{' '}
                  {faithEnglish}
                </p>
                <Link to="/about" className="mt-4 inline-block font-semibold text-gold-dark hover:underline">
                  We invite you to explore our “Statement of Faith”
                </Link>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <ServiceTimes />

      {/* Ministries / quick links */}
      <section className="container-wide py-[clamp(48px,7vw,84px)]">
        <Reveal>
          <SectionHeading eyebrow="Get involved" title="Our Ministries" />
        </Reveal>
        <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {ministries.map((m, i) => (
            <Reveal key={m.en} delay={(i % 4) * 90}>
              <MinistryCard {...m} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <div className="bg-soft-pattern">
        <Gallery />
      </div>

      {/* Media */}
      <section className="container-wide py-[clamp(48px,7vw,84px)]">
        <Reveal>
          <SectionHeading eyebrow="Watch & listen" title="Sermons & Worship" />
          <p className="mx-auto mt-3 max-w-xl text-center text-muted">
            Catch up on recent messages and worship — <span lang="am">ስብከቶችንና የአምልኮ ጊዜን</span>.
          </p>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-12 max-w-4xl">
          <div className="card p-[clamp(16px,3vw,28px)]">
            <iframe
              title="Sermons & worship playlist"
              src={sermonsPlaylist}
              className="aspect-video w-full rounded-lg border-0 shadow-md"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="mt-6 text-center">
              <a
                href={contact.youtube}
                target="_blank"
                rel="noreferrer"
                className="btn btn-gold"
              >
                <i className="fab fa-youtube" />
                View all on YouTube
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <FacebookVideos />

      <VisitCTA />
    </>
  )
}

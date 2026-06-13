import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { useFacebookMedia } from '../hooks/useFacebookMedia.js'

export default function FacebookVideos() {
  const { videos } = useFacebookMedia()

  // Render nothing until videos are available (keeps the page clean pre-setup)
  if (!videos.length) return null

  return (
    <section className="container-wide py-[clamp(48px,7vw,84px)]">
      <Reveal>
        <SectionHeading eyebrow="Latest from Facebook" title="Recent Videos" />
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {videos.slice(0, 6).map((v, i) => (
          <Reveal key={v.id} delay={(i % 3) * 90}>
            <div className="card overflow-hidden p-2.5">
              <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '16 / 9' }}>
                <iframe
                  title={v.title || `Facebook video ${i + 1}`}
                  src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                    v.permalink,
                  )}&show_text=false&autoplay=false`}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              {v.title && (
                <p className="px-2 py-3 text-center font-serif text-[0.98rem] text-navy line-clamp-2">
                  {v.title}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

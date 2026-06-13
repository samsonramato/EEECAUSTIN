export default function PageHero({ eyebrow, title }) {
  return (
    <section className="relative flex min-h-[46vh] w-full items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/image/hero-bg.jpg)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/55 to-navy/80" aria-hidden="true" />
      <div className="relative z-[2] px-6 text-center text-white animate-rise">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif font-extrabold text-[clamp(2rem,5vw,3.2rem)] drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          {title}
        </h1>
      </div>
    </section>
  )
}

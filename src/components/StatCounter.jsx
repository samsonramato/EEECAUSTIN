import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 to `value` once it scrolls into view.
 * `value` may include a non-numeric suffix/prefix, e.g. "2+", "100%".
 * Respects prefers-reduced-motion.
 */
export default function StatCounter({ value, duration = 1400, className = '' }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(value)

  // Split "100%" -> { num: 100, suffix: "%" }, "2+" -> { num: 2, suffix: "+" }
  const match = String(value).match(/^(\D*)(\d+)(\D*)$/)

  useEffect(() => {
    const el = ref.current
    if (!el || !match) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const [, prefix, numStr, suffix] = match
    const target = parseInt(numStr, 10)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const start = performance.now()
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
          setDisplay(`${prefix}${Math.round(eased * target)}${suffix}`)
          if (t < 1) requestAnimationFrame(tick)
        }
        setDisplay(`${prefix}0${suffix}`)
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [match, duration])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// The landing page's one scroll moment: a trail line draws itself up the mountain
// as the section scrolls through the screen, and each stop lights up when the line
// reaches it.
//
// Performance: the scroll position is written straight to a CSS variable on the
// section (no React state per frame), and the listener is only attached while the
// section is on screen (IntersectionObserver). Both are removed in the cleanup.
// Reduced motion: the line is shown fully drawn and every stop is lit.

const STOPS = [
  { at: 0.08, time: '06:00', title: 'Trailhead', text: 'Honey almond oats and a doodh patti before the climb.', productId: 'tb-honey-oats', x: 140, y: 470 },
  { at: 0.38, time: '08:00', title: 'Halfway', text: 'A handful of desi trail mix and an electrolyte sachet.', productId: 'tb-trail-mix', x: 470, y: 330 },
  { at: 0.7, time: '10:00', title: 'Summit', text: 'Boil 330 ml, wait twelve minutes: hot chicken biryani.', productId: 'tb-chicken-biryani', x: 760, y: 130 },
  { at: 0.95, time: '12:30', title: 'Way down', text: 'Gur chikki in your pocket for the last steep steps.', productId: 'tb-gur-chikki', x: 1030, y: 400 },
]

const PATH = 'M60 520 C140 500 120 450 180 440 S320 420 360 380 S460 350 480 320 S600 260 640 220 S730 150 760 130 S880 210 920 260 S990 360 1040 400 S1120 470 1160 500'

export default function TrailJourney() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const stage = section.querySelector('.journey__stage')
    const stops = [...section.querySelectorAll('[data-at]')]

    function setProgress(progress) {
      section.style.setProperty('--progress', progress.toFixed(3))
      for (const stop of stops) stop.toggleAttribute('data-reached', progress >= Number(stop.dataset.at))
    }

    if (reduceMotion) {
      setProgress(1)
      return undefined
    }

    let frame = 0
    function onScroll() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        // Progress follows the map itself: 0 when its top enters the lower fifth of
        // the screen, 1 when its bottom has risen to 75% of the screen height.
        const rect = stage.getBoundingClientRect()
        const viewport = window.innerHeight
        const travelled = viewport * 0.8 - rect.top
        const distance = rect.height - viewport * 0.05
        setProgress(Math.min(1, Math.max(0, travelled / distance)))
      })
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
      } else {
        window.removeEventListener('scroll', onScroll)
      }
    })
    observer.observe(section)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section ref={sectionRef} className="journey" aria-labelledby="journey-heading" style={{ '--progress': 0 }}>
      <div className="wrap">
        <h2 id="journey-heading">From trailhead to summit, fed</h2>
        <p className="journey__lead">
          Eat a little, often, and keep the hot meal for the top. Here is a morning on the Margallas, stop by stop.
        </p>
      </div>

      <div className="journey__stage">
        <svg className="journey__map" viewBox="0 0 1220 560" aria-hidden="true" focusable="false">
          <path
            d="M0 560 L120 470 L260 450 L420 330 L560 250 L760 110 L900 230 L1040 380 L1220 480 V560 Z"
            fill="var(--color-surface)"
          />
          <path d={PATH} className="journey__track" />
          <path d={PATH} className="journey__line" pathLength="1" />
          {STOPS.map((stop) => (
            <g key={stop.title} className="journey__pin" data-at={stop.at}>
              <circle cx={stop.x} cy={stop.y} r="18" className="journey__pin-halo" />
              <circle cx={stop.x} cy={stop.y} r="8" className="journey__pin-dot" />
            </g>
          ))}
        </svg>

        <ol className="journey__stops wrap">
          {STOPS.map((stop) => (
            <li key={stop.title} className="journey__stop" data-at={stop.at}>
              <span className="journey__time">{stop.time}</span>
              <h3>{stop.title}</h3>
              <p>{stop.text}</p>
              <Link to={`/products/${stop.productId}`}>See the product</Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

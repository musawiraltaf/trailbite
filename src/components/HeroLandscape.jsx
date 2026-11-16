// Layered night landscape for the landing hero: stars, a dawn glow and five
// ridge lines from far (pale) to near (dark). Authored SVG, no images.
// Each ridge has its own class so CSS can raise it into place on load with a
// small stagger (home.css: .ridge, --d).

// Fixed star positions so the sky is identical on every render
const STARS = [
  [80, 60, 1.2], [190, 120, 0.8], [260, 40, 1], [370, 90, 1.4], [450, 30, 0.8], [540, 140, 1],
  [620, 70, 1.2], [720, 110, 0.8], [800, 40, 1], [880, 150, 1.3], [960, 80, 0.9], [1050, 30, 1.2],
  [1130, 120, 0.8], [1210, 60, 1.1], [1290, 140, 0.9], [1370, 50, 1.3], [140, 190, 0.7], [330, 200, 0.9],
  [690, 210, 0.7], [1010, 200, 0.8], [1250, 220, 0.7], [40, 140, 0.9], [1420, 180, 0.8],
]

const RIDGES = [
  // far to near: path, fill
  ['M0 430 L120 380 L230 405 L340 350 L470 395 L590 340 L720 385 L860 330 L990 380 L1120 345 L1260 390 L1440 350 V900 H0 Z', '#2c4a3f'],
  ['M0 500 L140 440 L260 470 L400 410 L520 455 L650 400 L780 450 L920 395 L1060 455 L1200 410 L1330 445 L1440 420 V900 H0 Z', '#22392f'],
  ['M0 580 L160 505 L300 545 L450 480 L600 530 L760 470 L900 520 L1050 465 L1210 525 L1350 490 L1440 510 V900 H0 Z', '#182b23'],
  ['M0 660 L180 590 L340 630 L520 560 L700 615 L880 565 L1040 620 L1220 575 L1440 625 V900 H0 Z', '#11201a'],
  ['M0 760 L220 690 L420 730 L640 670 L860 725 L1080 680 L1300 735 L1440 705 V900 H0 Z', '#0d1512'],
]

export default function HeroLandscape() {
  return (
    <svg
      className="hero-landscape"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1210" />
          <stop offset="0.55" stopColor="#132a24" />
          <stop offset="0.8" stopColor="#3a3424" />
        </linearGradient>
        <radialGradient id="dawn" cx="0.68" cy="0.5" r="0.45">
          <stop offset="0" stopColor="#e8a64c" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#c4572e" stopOpacity="0.16" />
          <stop offset="1" stopColor="#c4572e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efe8d8" stopOpacity="0" />
          <stop offset="1" stopColor="#efe8d8" stopOpacity="0.07" />
        </linearGradient>
      </defs>

      <rect width="1440" height="900" fill="url(#sky)" />
      <rect className="hero-glow" width="1440" height="900" fill="url(#dawn)" />

      <g className="hero-stars" fill="#efe8d8">
        {STARS.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} opacity={0.35 + r * 0.3} />
        ))}
      </g>

      {/* Sun just about to clear the far ridge */}
      <circle className="hero-sun" cx="980" cy="372" r="34" fill="#f3bb6b" opacity="0.9" />

      {RIDGES.map(([d, fill], index) => (
        <g key={fill} className="ridge" style={{ '--d': index }}>
          <path d={d} fill={fill} />
          {index < 4 && <rect x="0" y={360 + index * 90} width="1440" height="120" fill="url(#mist)" />}
        </g>
      ))}
    </svg>
  )
}

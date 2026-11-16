// Product illustration: authored SVG, drawn for TrailBite (no stock photos).
// Each product names a `shape` and a `color` in its data (src/data/products.js);
// the shape decides the drawing, the colour tints it. If a product has a real
// photo (`image`) it is used instead, with this drawing as the fallback when
// the photo fails to load (edge case: missing image).
import { useState } from 'react'

const INK = '#efe8d8'
const SHADOW = 'rgb(0 0 0 / 0.28)'

// Small mountain logo printed on packaging
function Logo({ x, y, size = 1 }) {
  return (
    <path
      d={`M${x - 10 * size} ${y + 6 * size} L${x - 3 * size} ${y - 5 * size} L${x + 1 * size} ${y + 1 * size} L${x + 4 * size} ${y - 3 * size} L${x + 10 * size} ${y + 6 * size} Z`}
      fill={INK}
      opacity="0.9"
    />
  )
}

const SHAPES = {
  // Stand-up meal pouch with zip seal and label band
  pouch: (c) => (
    <>
      <path d="M28 18 H92 L98 126 Q60 134 22 126 Z" fill={c} />
      <path d="M28 18 H92 L93 30 H27 Z" fill={SHADOW} />
      <path d="M27 36 H93" stroke={INK} strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
      <rect x="32" y="58" width="56" height="40" rx="6" fill={INK} opacity="0.92" />
      <path d="M44 86 L54 70 L60 79 L65 73 L76 86 Z" fill={c} />
      <circle cx="70" cy="66" r="3" fill={c} />
      <path d="M98 126 Q60 134 22 126 L24 112 Q60 118 96 112 Z" fill={SHADOW} />
    </>
  ),
  // Wrapped bar with crimped ends
  bar: (c) => (
    <g transform="rotate(-18 60 70)">
      <rect x="18" y="52" width="84" height="36" rx="4" fill={c} />
      <path d="M18 52 l-6 4 l6 4 l-6 4 l6 4 l-6 4 l6 4 l-6 4 l6 4 Z" fill={c} />
      <path d="M102 52 l6 4 l-6 4 l6 4 l-6 4 l6 4 l-6 4 l6 4 l-6 4 Z" fill={c} />
      <rect x="40" y="58" width="40" height="24" rx="4" fill={INK} opacity="0.92" />
      <Logo x={60} y={70} size={0.9} />
      <rect x="18" y="80" width="84" height="8" fill={SHADOW} />
    </g>
  ),
  // Drawstring sack (trail mix, dried fruit)
  sack: (c) => (
    <>
      <path d="M40 34 Q60 26 80 34 L84 44 Q104 70 98 112 Q60 128 22 112 Q16 70 36 44 Z" fill={c} />
      <path d="M36 44 Q60 52 84 44" stroke={INK} strokeWidth="3" fill="none" opacity="0.85" />
      <path d="M58 46 q-8 10 -16 4" stroke={INK} strokeWidth="2.5" fill="none" opacity="0.85" />
      <circle cx="44" cy="84" r="5" fill={INK} opacity="0.5" />
      <circle cx="62" cy="94" r="6" fill={INK} opacity="0.4" />
      <circle cx="78" cy="80" r="4" fill={INK} opacity="0.5" />
      <path d="M98 112 Q60 128 22 112 L24 102 Q60 116 96 102 Z" fill={SHADOW} />
    </>
  ),
  // Fanned stack of drink sachets
  sachet: (c) => (
    <>
      <rect x="22" y="40" width="44" height="74" rx="4" fill={c} transform="rotate(-12 44 77)" opacity="0.7" />
      <rect x="54" y="36" width="44" height="74" rx="4" fill={c} transform="rotate(10 76 73)" opacity="0.85" />
      <rect x="38" y="32" width="44" height="78" rx="4" fill={c} />
      <path d="M38 40 H82" stroke={INK} strokeWidth="2" strokeDasharray="2 3" opacity="0.7" />
      <rect x="44" y="62" width="32" height="22" rx="3" fill={INK} opacity="0.92" />
      <Logo x={60} y={73} size={0.75} />
    </>
  ),
  // Screw-cap squeeze pack / bottle
  bottle: (c) => (
    <>
      <rect x="48" y="16" width="24" height="14" rx="3" fill={INK} opacity="0.85" />
      <path d="M44 30 H76 Q90 38 90 56 V118 Q90 128 80 128 H40 Q30 128 30 118 V56 Q30 38 44 30 Z" fill={c} />
      <rect x="36" y="64" width="48" height="36" rx="5" fill={INK} opacity="0.92" />
      <Logo x={60} y={82} />
      <rect x="78" y="44" width="6" height="74" rx="3" fill={INK} opacity="0.2" />
    </>
  ),
  // Gas canister with valve
  canister: (c) => (
    <>
      <rect x="54" y="18" width="12" height="16" rx="2" fill="#9aa39c" />
      <path d="M30 52 Q30 34 60 34 Q90 34 90 52 V116 Q90 126 80 126 H40 Q30 126 30 116 Z" fill={c} />
      <rect x="30" y="70" width="60" height="30" fill={INK} opacity="0.92" />
      <path d="M52 94 L58 76 L62 86 L66 80 L70 94 Z" fill={c} />
      <path d="M40 74 h12 M40 80 h8" stroke={c} strokeWidth="3" />
      <rect x="80" y="40" width="5" height="80" rx="2" fill={INK} opacity="0.18" />
    </>
  ),
  // Folding knife
  knife: (c) => (
    <g transform="rotate(-35 60 70)">
      <path d="M20 64 H72 Q80 64 80 72 V76 H20 Q14 76 14 70 Q14 64 20 64 Z" fill={c} />
      <circle cx="26" cy="70" r="3" fill={INK} opacity="0.7" />
      <path d="M80 66 L118 62 Q114 74 80 76 Z" fill="#c9d1cb" />
      <path d="M80 70 L116 66" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
    </g>
  ),
  // Long-handle spork
  spork: (c) => (
    <g transform="rotate(-30 60 70)">
      <rect x="10" y="66" width="70" height="8" rx="4" fill={c} />
      <path d="M78 70 Q80 54 98 54 Q114 56 114 70 Q114 84 98 86 Q80 86 78 70 Z" fill={c} />
      <path d="M104 58 V66 M98 56 V66 M110 62 V68" stroke="var(--art-ground, #16231e)" strokeWidth="3" />
    </g>
  ),
  // Cook pot / stove
  pot: (c) => (
    <>
      <path d="M18 54 H102" stroke="#9aa39c" strokeWidth="5" strokeLinecap="round" />
      <path d="M26 58 H94 V104 Q94 120 78 120 H42 Q26 120 26 104 Z" fill={c} />
      <path d="M40 50 Q60 40 80 50" stroke={INK} strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M50 36 q4 -8 0 -16 M62 34 q4 -8 0 -16 M74 36 q4 -8 0 -16" stroke={INK} strokeWidth="2.5" fill="none" opacity="0.5" strokeLinecap="round" />
      <rect x="82" y="60" width="6" height="52" rx="3" fill={INK} opacity="0.18" />
    </>
  ),
  // Headlamp
  lamp: (c) => (
    <>
      <path d="M14 76 Q60 40 106 76" stroke={c} strokeWidth="9" fill="none" strokeLinecap="round" />
      <rect x="38" y="64" width="44" height="34" rx="9" fill="#2b3a33" />
      <circle cx="60" cy="81" r="12" fill={INK} />
      <circle cx="60" cy="81" r="6" fill={c} />
      <path d="M60 100 L44 128 H76 Z" fill={INK} opacity="0.12" />
    </>
  ),
  // Pair of trekking poles
  poles: (c) => (
    <>
      <path d="M40 18 L58 126" stroke="#c9d1cb" strokeWidth="4" strokeLinecap="round" />
      <path d="M80 18 L62 126" stroke="#c9d1cb" strokeWidth="4" strokeLinecap="round" />
      <rect x="32" y="16" width="14" height="30" rx="6" fill={c} transform="rotate(-10 39 31)" />
      <rect x="74" y="16" width="14" height="30" rx="6" fill={c} transform="rotate(10 81 31)" />
      <circle cx="56" cy="114" r="6" fill="none" stroke={c} strokeWidth="3" />
      <circle cx="64" cy="114" r="6" fill="none" stroke={c} strokeWidth="3" />
    </>
  ),
  // Water filter bottle
  filter: (c) => (
    <>
      <rect x="50" y="14" width="20" height="10" rx="3" fill={INK} opacity="0.85" />
      <rect x="44" y="24" width="32" height="14" rx="4" fill="#2b3a33" />
      <rect x="38" y="38" width="44" height="88" rx="12" fill={c} opacity="0.55" />
      <rect x="52" y="44" width="16" height="60" rx="6" fill={INK} opacity="0.8" />
      <path d="M38 96 H82 V114 Q82 126 70 126 H50 Q38 126 38 114 Z" fill={c} />
    </>
  ),
  // Cap (merch)
  cap: (c) => (
    <>
      <path d="M24 86 Q24 42 62 40 Q98 42 98 86 Z" fill={c} />
      <path d="M24 86 Q60 80 98 86 Q118 90 112 98 Q70 100 24 92 Z" fill={c} />
      <path d="M24 86 Q60 80 98 86 Q118 90 112 98 Q70 100 24 92 Z" fill={SHADOW} />
      <circle cx="61" cy="41" r="3" fill={INK} />
      <Logo x={60} y={66} />
    </>
  ),
  // Enamel mug (merch)
  mug: (c) => (
    <>
      <path d="M84 58 Q104 58 104 76 Q104 94 84 94" stroke={c} strokeWidth="8" fill="none" />
      <path d="M28 44 H88 V108 Q88 118 78 118 H38 Q28 118 28 108 Z" fill={INK} />
      <rect x="28" y="44" width="60" height="8" fill={c} />
      <path d="M44 94 L54 76 L60 85 L65 79 L74 94 Z" fill={c} />
      <ellipse cx="58" cy="44" rx="30" ry="4" fill={c} />
    </>
  ),
  // Embroidered patch / sticker
  patch: (c) => (
    <>
      <circle cx="60" cy="72" r="46" fill={c} />
      <circle cx="60" cy="72" r="40" fill="none" stroke={INK} strokeWidth="2" strokeDasharray="4 3" opacity="0.8" />
      <path d="M32 88 L50 58 L60 72 L68 62 L88 88 Z" fill={INK} />
      <circle cx="74" cy="52" r="5" fill={INK} opacity="0.8" />
    </>
  ),
  // Bandana / neck gaiter
  bandana: (c) => (
    <>
      <path d="M16 34 H104 L60 118 Z" fill={c} />
      <path d="M26 40 H94 L60 106 Z" fill="none" stroke={INK} strokeWidth="2" strokeDasharray="5 4" opacity="0.7" />
      <path d="M42 62 L52 50 L58 58 L62 54 L72 62 Z" fill={INK} opacity="0.85" />
    </>
  ),
}

export default function ProductArt({ product, size = 'card' }) {
  const [photoFailed, setPhotoFailed] = useState(false)
  const { art = {}, name } = product
  const draw = SHAPES[art.shape] ?? SHAPES.pouch

  if (product.image && !photoFailed) {
    return (
      <div className={`product-art product-art--${size}`}>
        <img src={product.image} alt={name} loading="lazy" onError={() => setPhotoFailed(true)} />
      </div>
    )
  }

  return (
    <div className={`product-art product-art--${size}`} style={{ '--art-ground': art.ground }}>
      <svg viewBox="0 0 120 140" role="img" aria-label={`Illustration of ${name}`}>
        {draw(art.color ?? '#c27a3a')}
      </svg>
    </div>
  )
}

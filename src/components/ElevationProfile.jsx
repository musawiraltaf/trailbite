// Elevation chart for a trail, drawn from its `profile` samples (0–100).
// It shows the shape of the climb: a steady ramp, a flat walk or a ridge with dips.
export default function ElevationProfile({ trail, size = 'card' }) {
  const width = 300
  const height = size === 'large' ? 120 : 70
  const points = trail.profile.map((value, index) => {
    const x = (index / (trail.profile.length - 1)) * width
    const y = height - 6 - (value / 100) * (height - 14)
    return [x, y]
  })

  // Smooth line through the points using midpoints as curve anchors
  let line = `M${points[0][0]},${points[0][1]}`
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1]
    const [x1, y1] = points[i]
    const midX = (x0 + x1) / 2
    line += ` C${midX},${y0} ${midX},${y1} ${x1},${y1}`
  }
  const area = `${line} L${width},${height} L0,${height} Z`
  const gradientId = `elev-${trail.id}-${size}`

  return (
    <svg
      className={`elevation elevation--${size}`}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`Elevation profile of ${trail.name}: about ${trail.climbM} metres of climbing`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.45" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path d={line} fill="none" stroke="var(--color-accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

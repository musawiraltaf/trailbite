// TrailBite logo mark: two ridges and a rising sun, drawn as SVG.
export default function BrandMark({ size = 26, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="22" cy="10" r="4" fill="currentColor" opacity="0.9" />
      <path d="M2 27 L12 11 L17 18 L20 14 L30 27 Z" fill="currentColor" />
      <path d="M9 27 L14 19 L18 27 Z" fill="var(--color-bg)" opacity="0.55" />
    </svg>
  )
}

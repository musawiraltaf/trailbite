import { Signal, SignalHigh, SignalMedium } from 'lucide-react'

// Difficulty as words plus an icon with 1–3 bars, never colour alone.
const STYLES = {
  easy: { label: 'Easy', Icon: SignalMedium },
  moderate: { label: 'Moderate', Icon: SignalHigh },
  hard: { label: 'Hard', Icon: Signal },
}

export default function DifficultyBadge({ difficulty }) {
  const { label, Icon } = STYLES[difficulty]
  return (
    <span className={`difficulty difficulty--${difficulty}`}>
      <Icon size={15} aria-hidden="true" />
      {label}
    </span>
  )
}

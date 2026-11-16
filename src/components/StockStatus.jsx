import { CircleCheck, CircleX, TriangleAlert } from 'lucide-react'
import { MAX_PER_PRODUCT } from '../rules/businessRules.js'

// Availability is always shown as words plus an icon, never colour alone.
// It has its own space in the card, so it can never collide with the price (Problem 1).
export function getStockLabel(stock) {
  if (stock <= 0) return { text: 'Out of stock', tone: 'out' }
  if (stock < MAX_PER_PRODUCT) return { text: `Only ${stock} left`, tone: 'low' }
  return { text: 'In stock', tone: 'in' }
}

const ICONS = { in: CircleCheck, low: TriangleAlert, out: CircleX }

export default function StockStatus({ stock }) {
  const { text, tone } = getStockLabel(stock)
  const Icon = ICONS[tone]
  return (
    <p className={`stock stock--${tone}`}>
      <Icon size={16} className="icon" aria-hidden="true" />
      {text}
    </p>
  )
}

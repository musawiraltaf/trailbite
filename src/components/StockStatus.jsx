import { MAX_PER_PRODUCT } from '../rules/businessRules.js'

// Availability always shown as words plus an icon, never colour alone (accessibility).
// It sits on its own line in the card, so it can never collide with the price (Problem 1).
export function getStockLabel(stock) {
  if (stock <= 0) return { text: 'Out of stock', tone: 'out' }
  if (stock < MAX_PER_PRODUCT) return { text: `Only ${stock} left`, tone: 'low' }
  return { text: 'In stock', tone: 'in' }
}

const ICONS = { in: '●', low: '▲', out: '✕' }

export default function StockStatus({ stock }) {
  const { text, tone } = getStockLabel(stock)
  return (
    <p className={`stock stock--${tone}`}>
      <span aria-hidden="true">{ICONS[tone]}</span> {text}
    </p>
  )
}

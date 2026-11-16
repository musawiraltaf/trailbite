// Formats a whole-rupee amount as "Rs 1,450".
export function formatPrice(amount) {
  return `Rs ${amount.toLocaleString('en-PK')}`
}

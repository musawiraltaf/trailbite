// Preparation details — part of the fix for Problem 3 (the reference site shows an
// "Instructions" tab with nothing in it). Here the key facts are structured data,
// so they can be shown as a quick summary near the price and in full further down.

const METHOD_LABELS = {
  'hot-water': 'Add boiling water',
  'cold-water': 'Add cold or warm water',
  'no-cook': 'Ready to eat',
}

/** Short facts shown beside the price: method, water and time. */
export function PrepSummary({ preparation }) {
  if (!preparation) return null
  const { method, water, time } = preparation

  return (
    <dl className="prep-summary">
      <div>
        <dt>Method</dt>
        <dd>{METHOD_LABELS[method]}</dd>
      </div>
      {water && (
        <div>
          <dt>Water</dt>
          <dd>{water}</dd>
        </div>
      )}
      {time && (
        <div>
          <dt>Ready in</dt>
          <dd>{time}</dd>
        </div>
      )}
    </dl>
  )
}

/** Full step-by-step instructions for the Preparation section. */
export function PrepSteps({ preparation }) {
  if (preparation.method === 'no-cook') {
    return <p>No water or stove needed. Open the pack and eat straight away.</p>
  }

  return (
    <ol className="prep-steps">
      {preparation.steps.map((step) => (
        <li key={step}>{step}</li>
      ))}
    </ol>
  )
}

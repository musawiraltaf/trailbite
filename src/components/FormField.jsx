// Label + input + hint + error, wired together for screen readers:
// the label uses htmlFor, and aria-describedby points at the hint and error text.
export default function FormField({ id, label, hint, error, children }) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={`field${error ? ' field--invalid' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {hint && (
        <p id={hintId} className="field__hint">
          {hint}
        </p>
      )}
      {/* children is a function so the parent's input receives the accessibility props */}
      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}
      {error && (
        <p id={errorId} className="field__error">
          <span aria-hidden="true">⚠ </span>
          {error}
        </p>
      )}
    </div>
  )
}

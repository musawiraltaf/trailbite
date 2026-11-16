import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Info } from 'lucide-react'
import TrailCard from '../components/TrailCard.jsx'
import { AREAS, DIFFICULTIES, trails } from '../data/trails.js'
import { DURATION_OPTIONS, TRAIL_SORTS, filterTrails, sortTrails } from '../lib/trailSearch.js'

// Trail finder (/trails): search and filter trails around Islamabad and Rawalpindi.
// Same approach as the shop: filters live in the URL so Back and shared links work.
export default function TrailsPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const area = params.get('area') ?? ''
  const difficulty = params.get('difficulty') ?? ''
  const duration = params.get('duration') ?? ''
  const sort = params.get('sort') ?? 'trending'

  const results = useMemo(
    () => sortTrails(filterTrails(trails, { query, area, difficulty, duration }), sort),
    [query, area, difficulty, duration, sort],
  )

  function update(key, value) {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: key === 'q' },
    )
  }

  return (
    <section aria-labelledby="trails-heading">
      <header className="page-heading">
        <h1 id="trails-heading">Find a trail near Islamabad</h1>
        <p>
          {trails.length} hikes from a sunrise climb in the Margallas to a full day in the Galiyat. Each trail comes with
          a pack list you can add to your cart in one go.
        </p>
      </header>

      <form className="filters filters--trails" role="search" onSubmit={(event) => event.preventDefault()}>
        <div className="field">
          <label htmlFor="trail-search">Search trails</label>
          <input
            id="trail-search"
            type="search"
            value={query}
            placeholder="e.g. stream, summit, family"
            onChange={(event) => update('q', event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="trail-area">Area</label>
          <select id="trail-area" value={area} onChange={(event) => update('area', event.target.value)}>
            <option value="">All areas</option>
            {AREAS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="trail-difficulty">Difficulty</label>
          <select id="trail-difficulty" value={difficulty} onChange={(event) => update('difficulty', event.target.value)}>
            <option value="">Any difficulty</option>
            {DIFFICULTIES.map((level) => (
              <option key={level} value={level}>
                {level[0].toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="trail-duration">Time on trail</label>
          <select id="trail-duration" value={duration} onChange={(event) => update('duration', event.target.value)}>
            {DURATION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="trail-sort">Sort by</label>
          <select id="trail-sort" value={sort} onChange={(event) => update('sort', event.target.value)}>
            {TRAIL_SORTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </form>

      <p className="results-count" role="status">
        {results.length} of {trails.length} trails
      </p>

      {results.length > 0 ? (
        <ul className="trail-grid">
          {results.map((trail, index) => (
            <li key={trail.id} style={{ '--i': index }}>
              <TrailCard trail={trail} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="state-panel">
          <h2>No trails match these filters</h2>
          <p>Try a different area or a longer time on trail.</p>
          <button type="button" className="button button--secondary" onClick={() => setParams({})}>
            Clear all filters
          </button>
        </div>
      )}

      <div className="notice notice--info trails-disclaimer">
        <Info size={18} className="icon" aria-hidden="true" />
        <p>
          Distances, climbs and times are approximate round trips from public trail guides. Check the signboards at the
          trailhead, tell someone your route and turn back if the weather changes.
        </p>
      </div>
    </section>
  )
}

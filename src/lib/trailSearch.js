// Search, filter and sort for the trail finder. Pure functions like src/lib/catalogue.js.

export const DURATION_OPTIONS = [
  { value: '', label: 'Any length' },
  { value: 'short', label: 'Under 2 hours' },
  { value: 'half', label: '2 to 4 hours' },
  { value: 'long', label: 'Over 4 hours' },
]

export const TRAIL_SORTS = [
  { value: 'trending', label: 'Trending' },
  { value: 'easiest', label: 'Easiest first' },
  { value: 'shortest', label: 'Shortest first' },
  { value: 'nearest', label: 'Nearest to Islamabad' },
]

const DIFFICULTY_ORDER = { easy: 0, moderate: 1, hard: 2 }

function matchesDuration(trail, duration) {
  const longest = trail.hours[1]
  if (duration === 'short') return longest <= 2
  if (duration === 'half') return longest > 2 && longest <= 4
  if (duration === 'long') return longest > 4
  return true
}

export function filterTrails(trails, { query = '', area = '', difficulty = '', duration = '' }) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  return trails.filter((trail) => {
    const text = [trail.name, trail.area, trail.start, trail.summary, ...trail.highlights].join(' ').toLowerCase()
    return (
      words.every((word) => text.includes(word)) &&
      (!area || trail.area === area) &&
      (!difficulty || trail.difficulty === difficulty) &&
      matchesDuration(trail, duration)
    )
  })
}

export function sortTrails(trails, sort) {
  const copy = [...trails]
  switch (sort) {
    case 'easiest':
      return copy.sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty] || a.climbM - b.climbM)
    case 'shortest':
      return copy.sort((a, b) => a.hours[1] - b.hours[1])
    case 'nearest':
      return copy.sort((a, b) => a.driveMinutes - b.driveMinutes)
    default:
      return copy.sort((a, b) => b.trending - a.trending)
  }
}

/** "10 min" / "2 h 30 min" drive from Islamabad */
export function formatDrive(minutes) {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h} h ${m} min` : `${h} h`
}

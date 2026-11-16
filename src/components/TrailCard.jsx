import { Link } from 'react-router-dom'
import { Car, Clock, Mountain, Route } from 'lucide-react'
import ElevationProfile from './ElevationProfile.jsx'
import DifficultyBadge from './DifficultyBadge.jsx'
import { formatHours } from '../data/trails.js'
import { formatDrive } from '../lib/trailSearch.js'

export default function TrailCard({ trail }) {
  const { id, name, area, summary, distanceKm, climbM, hours, difficulty, driveMinutes, packList } = trail

  return (
    <article className="trail-card">
      <ElevationProfile trail={trail} />
      <div className="trail-card__body">
        <div className="trail-card__top">
          <p className="product-card__category">{area}</p>
          <DifficultyBadge difficulty={difficulty} />
        </div>
        <h3 className="trail-card__name">
          <Link to={`/trails/${id}`}>{name}</Link>
        </h3>
        <p className="trail-card__summary">{summary}</p>

        <dl className="trail-stats">
          <div>
            <dt>
              <Route size={15} aria-hidden="true" /> Distance
            </dt>
            <dd>{distanceKm} km</dd>
          </div>
          <div>
            <dt>
              <Mountain size={15} aria-hidden="true" /> Climb
            </dt>
            <dd>{climbM} m</dd>
          </div>
          <div>
            <dt>
              <Clock size={15} aria-hidden="true" /> Time
            </dt>
            <dd>{formatHours(hours)}</dd>
          </div>
          <div>
            <dt>
              <Car size={15} aria-hidden="true" /> Drive
            </dt>
            <dd>{formatDrive(driveMinutes)}</dd>
          </div>
        </dl>

        <p className="trail-card__pack">{packList.length} items in the pack list</p>
      </div>
    </article>
  )
}

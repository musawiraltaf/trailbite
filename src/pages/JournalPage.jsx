import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { formatPostDate, posts } from '../data/journal.js'
import { trails } from '../data/trails.js'

// Trail Journal (/journal): trending trails and trail-food guides.
export default function JournalPage() {
  const tags = ['All', ...new Set(posts.map((post) => post.tag))]
  const [tag, setTag] = useState('All')

  const shown = posts.filter((post) => tag === 'All' || post.tag === tag)
  const [lead, ...rest] = [...shown].sort((a, b) => a.trending - b.trending)
  const trendingTrails = [...trails].sort((a, b) => b.trending - a.trending).slice(0, 5)

  return (
    <section aria-labelledby="journal-heading">
      <header className="page-heading">
        <h1 id="journal-heading">Trail Journal</h1>
        <p>Where to walk this month and what to carry, from the people who pack your meals.</p>
      </header>

      <div className="tag-filter" role="group" aria-label="Filter posts by topic">
        {tags.map((name) => (
          <button
            key={name}
            type="button"
            className="tag-filter__button"
            aria-pressed={tag === name}
            onClick={() => setTag(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="journal-layout">
        <div className="journal-posts">
          {lead && (
            <article className="post-card post-card--lead">
              <p className="post-card__meta">
                {lead.tag} · {formatPostDate(lead.date)} · {lead.readMinutes} min read
              </p>
              <h2>
                <Link to={`/journal/${lead.slug}`}>{lead.title}</Link>
              </h2>
              <p>{lead.excerpt}</p>
              <span className="post-card__more" aria-hidden="true">
                Read the post <ArrowRight size={16} />
              </span>
            </article>
          )}

          <ul className="post-list">
            {rest.map((post) => (
              <li key={post.slug}>
                <article className="post-card">
                  <p className="post-card__meta">
                    {post.tag} · {post.readMinutes} min read
                  </p>
                  <h3>
                    <Link to={`/journal/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>

        <aside className="trending-trails" aria-labelledby="trending-heading">
          <h2 id="trending-heading">
            <TrendingUp size={20} aria-hidden="true" /> Trending trails
          </h2>
          <ol>
            {trendingTrails.map((trail) => (
              <li key={trail.id}>
                <Link to={`/trails/${trail.id}`}>{trail.name}</Link>
                <span>
                  {trail.area} · {trail.difficulty}
                </span>
              </li>
            ))}
          </ol>
          <Link to="/trails" className="button button--secondary button--block">
            Open the trail finder
          </Link>
        </aside>
      </div>
    </section>
  )
}

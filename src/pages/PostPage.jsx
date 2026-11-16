import { Link, useParams } from 'react-router-dom'
import { useCatalogue } from '../app/CatalogueContext.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import TrailCard from '../components/TrailCard.jsx'
import { formatPostDate, posts } from '../data/journal.js'
import { trails } from '../data/trails.js'

// One journal post (/journal/:slug), with the trails and products it mentions.
export default function PostPage() {
  const { slug } = useParams()
  const { products, status } = useCatalogue()
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    return (
      <section className="state-panel">
        <h1>Post not found</h1>
        <p>This post may have moved. The latest posts are on the Trail Journal page.</p>
        <Link to="/journal" className="button button--primary">
          Go to the Trail Journal
        </Link>
      </section>
    )
  }

  const mentionedTrails = post.trailIds.map((id) => trails.find((trail) => trail.id === id)).filter(Boolean)
  const mentionedProducts = post.productIds.map((id) => products.find((product) => product.id === id)).filter(Boolean)

  return (
    <article className="post">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <ol>
          <li>
            <Link to="/journal">Trail Journal</Link>
          </li>
          <li aria-current="page">{post.title}</li>
        </ol>
      </nav>

      <header className="post__header">
        <p className="post-card__meta">
          {post.tag} · {formatPostDate(post.date)} · {post.readMinutes} min read
        </p>
        <h1>{post.title}</h1>
        <p className="post__lead">{post.excerpt}</p>
      </header>

      <div className="post__body">
        {post.body.map((block, index) => {
          // Index keys are safe here: post content is static and never reordered.
          if (block.type === 'h2') return <h2 key={index}>{block.text}</h2>
          if (block.type === 'list')
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
          return <p key={index}>{block.text}</p>
        })}
      </div>

      {mentionedTrails.length > 0 && (
        <section className="section" aria-labelledby="post-trails">
          <h2 id="post-trails">Trails in this post</h2>
          <ul className="trail-grid">
            {mentionedTrails.map((trail) => (
              <li key={trail.id}>
                <TrailCard trail={trail} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {status === 'ready' && mentionedProducts.length > 0 && (
        <section className="section" aria-labelledby="post-products">
          <h2 id="post-products">Mentioned in this post</h2>
          <ProductGrid products={mentionedProducts} />
        </section>
      )}
    </article>
  )
}

import { useParams } from 'react-router-dom'

export default function ProductPage() {
  const { id } = useParams()
  return (
    <section>
      <h1>Product {id}</h1>
    </section>
  )
}

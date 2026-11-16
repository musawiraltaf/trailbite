import { business } from '../data/business.js'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__brand">{business.name}</p>
        <p>{business.operatingArea}</p>
        <p className="site-footer__note">
          Fictional business for a university assignment. Orders are simulated: no payment is taken and nothing is
          delivered.
        </p>
      </div>
    </footer>
  )
}

import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
            <h1>
              <span>Museum of</span>
              <span>Musical</span>
            </h1>
            <h2>Instruments</h2>
          </a>
        </Link>
      </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Museum of Musical Instruments 2022 :)</p>
      </footer>
    </div>
  )
}

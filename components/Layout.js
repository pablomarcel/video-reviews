import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
            <h1>
              <span>Video</span>
              <span>Game</span>
            </h1>
            <h2>Reviews</h2>
          </a>
        </Link>
      </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Museum of Video Reviews 2022 :)</p>
      </footer>
    </div>
  )
}

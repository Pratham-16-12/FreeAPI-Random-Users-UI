import './Header.css'

export default function Header({ totalItems }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon">👥</span>
          <span className="logo-text">PeopleHub</span>
        </div>
        <span className="total-badge">
          <span className="badge-dot" />
          {totalItems > 0 ? `${totalItems.toLocaleString()} users` : 'Loading…'}
        </span>
      </div>
    </header>
  )
}

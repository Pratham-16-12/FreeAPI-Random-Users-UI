import './UserCard.css'

function natFlag(nat) {
  if (!nat || nat.length !== 2) return ''
  return nat.toUpperCase().split('').map(c =>
    String.fromCodePoint(0x1F1E0 - 65 + c.charCodeAt(0))
  ).join('')
}

function genderColor(gender) {
  return gender === 'male' ? 'var(--accent2)' : 'var(--rose)'
}

export default function UserCard({ user, index, viewMode, onClick }) {
  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`
  const location = `${user.location.city}, ${user.location.country}`
  const isListView = viewMode === 'list'

  return (
    <article
      className={`user-card ${isListView ? 'list-card' : ''}`}
      onClick={onClick}
      style={{ animationDelay: `${index * 35}ms` }}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      id={`user-card-${user.id}`}
      aria-label={`View profile of ${fullName}`}
    >
      {/* Avatar */}
      <div className="card-avatar-wrap">
        <img
          className="card-avatar"
          src={isListView ? user.picture.thumbnail : user.picture.medium}
          alt={fullName}
          loading="lazy"
        />
        <span
          className="gender-dot"
          style={{ background: genderColor(user.gender) }}
          title={user.gender}
        />
      </div>

      {/* Info */}
      <div className="card-info">
        <div className="card-name">{fullName}</div>
        <div className="card-username">@{user.login.username}</div>

        <div className="card-meta">
          <span className="meta-item">
            <span className="meta-icon">📍</span>
            {location}
          </span>
          <span className="meta-item">
            <span className="meta-icon">🎂</span>
            Age {user.dob.age}
          </span>
        </div>

        <div className="card-footer-row">
          <span className="card-email">{user.email}</span>
          <span className="nat-flag" title={user.nat}>{natFlag(user.nat)}</span>
        </div>
      </div>

      <span className="card-cta">View profile →</span>
    </article>
  )
}

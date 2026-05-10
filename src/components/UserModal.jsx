import { useEffect } from 'react'
import './UserModal.css'

function natFlag(nat) {
  if (!nat || nat.length !== 2) return ''
  return nat.toUpperCase().split('').map(c =>
    String.fromCodePoint(0x1F1E0 - 65 + c.charCodeAt(0))
  ).join('')
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="info-row">
      <span className="info-icon">{icon}</span>
      <div>
        <p className="info-label">{label}</p>
        <p className="info-value">{value}</p>
      </div>
    </div>
  )
}

export default function UserModal({ user, onClose }) {
  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`
  const address  = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country} — ${user.location.postcode}`
  const dob      = new Date(user.dob.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
  const joined   = new Date(user.registered.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })

  // Close on ESC
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-overlay" id="modalOverlay" onClick={e => e.target.id === 'modalOverlay' && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={`Profile of ${fullName}`}>

        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Profile Header */}
        <div className="modal-header">
          <div className="modal-avatar-wrap">
            <img
              className="modal-avatar"
              src={user.picture.large}
              alt={fullName}
            />
            <span
              className="modal-gender-dot"
              style={{ background: user.gender === 'male' ? 'var(--accent2)' : 'var(--rose)' }}
            />
          </div>
          <div className="modal-hero-info">
            <h2 className="modal-name">{fullName}</h2>
            <p className="modal-username">@{user.login.username}</p>
            <div className="modal-tags">
              <span className="modal-tag">{natFlag(user.nat)} {user.nat}</span>
              <span className="modal-tag">{user.gender === 'male' ? '♂' : '♀'} {user.gender}</span>
              <span className="modal-tag">🎂 Age {user.dob.age}</span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="modal-details">
          <InfoRow icon="✉️" label="Email"    value={user.email} />
          <InfoRow icon="📞" label="Phone"    value={user.phone} />
          <InfoRow icon="📱" label="Cell"     value={user.cell} />
          <InfoRow icon="📍" label="Address"  value={address} />
          <InfoRow icon="🌐" label="Timezone" value={`UTC${user.location.timezone.offset} — ${user.location.timezone.description}`} />
          <InfoRow icon="🎂" label="Birthday" value={`${dob} (${user.dob.age} years old)`} />
          <InfoRow icon="📅" label="Registered" value={`${joined} (${user.registered.age} years ago)`} />
          <InfoRow icon="🆔" label="UUID"     value={user.login.uuid} />
        </div>

        {/* Map link */}
        <a
          className="map-link"
          href={`https://www.google.com/maps?q=${user.location.coordinates.latitude},${user.location.coordinates.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          id="mapLink"
        >
          📌 View on Google Maps
        </a>

      </div>
    </div>
  )
}

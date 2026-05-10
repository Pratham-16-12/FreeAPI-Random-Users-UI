import UserCard from './UserCard'
import './UserGrid.css'

const SKELETON_COUNT = 12

function SkeletonCard() {
  return <div className="skeleton-card" aria-hidden="true" />
}

export default function UserGrid({ users, loading, viewMode, onSelect, onReset }) {
  if (loading) {
    return (
      <div className={`users-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (!users.length) {
    return (
      <div className="state-box">
        <span className="state-icon">🔍</span>
        <h3>No users found</h3>
        <p>Try adjusting your search or filter.</p>
        <button className="btn-primary" onClick={onReset}>Reset Filters</button>
      </div>
    )
  }

  return (
    <div className={`users-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
      {users.map((user, i) => (
        <UserCard
          key={user.login.uuid}
          user={user}
          index={i}
          viewMode={viewMode}
          onClick={() => onSelect(user)}
        />
      ))}
    </div>
  )
}

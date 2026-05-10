import './Controls.css'

export default function Controls({
  search, onSearch,
  gender, onGender,
  sortBy, onSort,
  viewMode, onView,
  count, page, totalPages,
  isFiltering,
}) {
  return (
    <div className="controls-bar">
      <div className="controls-inner">
        {/* Search */}
        <div className="search-wrap">
          <span className="s-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, email, country…"
            value={search}
            onChange={e => onSearch(e.target.value)}
            id="searchInput"
          />
          {search && (
            <button className="s-clear" onClick={() => onSearch('')} aria-label="Clear">✕</button>
          )}
        </div>

        {/* Gender filter */}
        <div className="btn-group">
          {['all', 'male', 'female'].map(g => (
            <button
              key={g}
              className={`grp-btn ${gender === g ? 'active' : ''}`}
              onClick={() => onGender(g)}
              id={`gender-${g}`}
            >
              {g === 'all' ? 'All' : g === 'male' ? '♂ Male' : '♀ Female'}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          className="select-ctrl"
          value={sortBy}
          onChange={e => onSort(e.target.value)}
          id="sortSelect"
        >
          <option value="default">Default order</option>
          <option value="name-asc">Name A → Z</option>
          <option value="name-desc">Name Z → A</option>
          <option value="age-asc">Youngest first</option>
          <option value="age-desc">Oldest first</option>
          <option value="country">By Country</option>
        </select>

        {/* View toggle */}
        <div className="view-toggle">
          <button
            className={`vbtn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => onView('grid')} title="Grid view" id="viewGrid"
          >
            ⊞
          </button>
          <button
            className={`vbtn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => onView('list')} title="List view" id="viewList"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Results label */}
      <div className="results-bar">
        <span className="results-label">
          {isFiltering
            ? `${count} result${count !== 1 ? 's' : ''} found`
            : `${count} users · Page ${page} of ${totalPages}`}
        </span>
      </div>
    </div>
  )
}

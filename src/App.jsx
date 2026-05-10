import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Controls from './components/Controls'
import UserGrid from './components/UserGrid'
import UserModal from './components/UserModal'
import Pagination from './components/Pagination'
import './App.css'

const API = 'https://api.freeapi.app/api/v1/public/randomusers'

export default function App() {
  const [users, setUsers]           = useState([])
  const [filtered, setFiltered]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [page, setPage]             = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch]         = useState('')
  const [gender, setGender]         = useState('all')
  const [sortBy, setSortBy]         = useState('default')
  const [viewMode, setViewMode]     = useState('grid')
  const [selected, setSelected]     = useState(null)

  const fetchUsers = useCallback(async (pg = 1) => {
    setLoading(true)
    setError(null)
    try {
      const res  = await fetch(`${API}?page=${pg}&limit=12`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      const d    = json.data
      setUsers(d.data)
      setPage(d.page)
      setTotalPages(d.totalPages)
      setTotalItems(d.totalItems)
    } catch (e) {
      setError(e.message || 'Failed to load users.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchUsers(1) }, [fetchUsers])

  // Apply filters & sort whenever deps change
  useEffect(() => {
    let list = [...users]

    if (gender !== 'all')
      list = list.filter(u => u.gender === gender)

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(u =>
        `${u.name.first} ${u.name.last}`.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.location.country.toLowerCase().includes(q) ||
        u.login.username.toLowerCase().includes(q)
      )
    }

    switch (sortBy) {
      case 'name-asc':  list.sort((a, b) => a.name.first.localeCompare(b.name.first)); break
      case 'name-desc': list.sort((a, b) => b.name.first.localeCompare(a.name.first)); break
      case 'age-asc':   list.sort((a, b) => a.dob.age - b.dob.age); break
      case 'age-desc':  list.sort((a, b) => b.dob.age - a.dob.age); break
      case 'country':   list.sort((a, b) => a.location.country.localeCompare(b.location.country)); break
    }

    setFiltered(list)
  }, [users, search, gender, sortBy])

  const handlePageChange = (pg) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    fetchUsers(pg)
  }

  const handleReset = () => {
    setSearch(''); setGender('all'); setSortBy('default')
  }

  return (
    <>
      <Header totalItems={totalItems} />
      <Controls
        search={search}       onSearch={setSearch}
        gender={gender}       onGender={setGender}
        sortBy={sortBy}       onSort={setSortBy}
        viewMode={viewMode}   onView={setViewMode}
        count={filtered.length}
        page={page}           totalPages={totalPages}
        isFiltering={!!(search || gender !== 'all')}
      />
      <main className="app-main">
        {error ? (
          <div className="state-box">
            <span className="state-icon">⚠️</span>
            <h3>Failed to load users</h3>
            <p>{error}</p>
            <button className="btn-primary" onClick={() => fetchUsers(page)}>Retry</button>
          </div>
        ) : (
          <>
            <UserGrid
              users={filtered}
              loading={loading}
              viewMode={viewMode}
              onSelect={setSelected}
              onReset={handleReset}
            />
            {!loading && !error && filtered.length > 0 && !search && gender === 'all' && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>
      {selected && (
        <UserModal user={selected} onClose={() => setSelected(null)} />
      )}
      <footer className="app-footer">
        <p>
          Built by{' '}
          <a href="https://prathamdev.in" target="_blank" rel="noopener noreferrer">
            Pratham Bhardwaj
          </a>{' '}
          · ChaiCode Web Dev Cohort 2026 · Powered by{' '}
          <a href="https://freeapi.app" target="_blank" rel="noopener noreferrer">
            FreeAPI.app
          </a>
        </p>
      </footer>
    </>
  )
}

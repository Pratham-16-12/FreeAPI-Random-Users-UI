import './Pagination.css'

export default function Pagination({ page, totalPages, onChange }) {
  const buildPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages = [1]
    if (page > 3) pages.push('…')
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i)
    if (page < totalPages - 2) pages.push('…')
    pages.push(totalPages)
    return pages
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="pg-btn"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        id="prevBtn"
      >
        ← Prev
      </button>

      <div className="pg-nums">
        {buildPages().map((p, i) =>
          p === '…' ? (
            <span key={`ellipsis-${i}`} className="pg-ellipsis">…</span>
          ) : (
            <button
              key={p}
              className={`pg-num ${p === page ? 'active' : ''}`}
              onClick={() => onChange(p)}
              id={`pg-${p}`}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        className="pg-btn"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        id="nextBtn"
      >
        Next →
      </button>
    </nav>
  )
}

# 👥 PeopleHub — FreeAPI Random Users UI

> A React-based user interface built with Vite, showcasing random user profiles fetched from FreeAPI.app.
> Submitted for **ChaiCode Web Dev Cohort 2026** — FreeAPI Random Users UI.

## ✨ Features

- 👤 **User cards** — avatar, full name, username, location, age, email, nationality flag
- 🔍 **Live search** — filter by name, email, country or username in real-time
- ⚧️ **Gender filter** — toggle All / Male / Female
- ↕️ **Sort options** — A→Z, Z→A, Youngest, Oldest, By Country
- ⊞ **Grid / List view** — switch between masonry grid and compact list
- 🪟 **Profile modal** — full detail view with all API fields + Google Maps link
- 📄 **Pagination** — 12 users/page, 50 pages (500 total users)
- 💀 **Skeleton loader** — shimmer cards while fetching
- 📱 **Fully responsive** — works on all screen sizes

## 🔗 API

```
GET https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=12
```

## 🚀 Tech Stack

React 18 · Vite 6 · Vanilla CSS · FreeAPI.app

## 📂 Project Structure

```
src/
├── App.jsx / App.css          # Root state, fetch, filter, sort
├── index.css                  # CSS variables and global base
└── components/
    ├── Header.jsx / .css      # Logo + user count badge
    ├── Controls.jsx / .css    # Search, gender filter, sort, view toggle
    ├── UserGrid.jsx / .css    # Grid/list layout + skeleton loader
    ├── UserCard.jsx / .css    # Individual user card
    ├── UserModal.jsx / .css   # Full profile modal with all API fields
    └── Pagination.jsx / .css  # Page navigation
```

## 🖥️ Running Locally

```bash
cd "FreeAPI Random Users UI"
npm install
npm run dev
# Opens at http://localhost:5173
```

## 👤 Author

**Pratham Bhardwaj** · [prathamdev.in](https://prathamdev.in) · ChaiCode Web Dev Cohort 2026

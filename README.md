# ersatzteilstore24

A product catalogue web app with real-time search, pagination, and product detail view — built with React, TypeScript, Redux Toolkit, and Bootstrap 5.

## Tech Stack

- **React 19** + **TypeScript 6** + **Vite 8**
- **Redux Toolkit** + **RTK Query** — state management and API calls
- **React Router 6** — client-side routing with lazy loading
- **Bootstrap 5** + **Reactstrap** — UI components
- **SASS** — component-level styling
- **dummyjson.com** — mock product API

## Features

- Product listing with card grid
- Real-time search with 300ms debounce (server-side via API)
- Page-based pagination with ellipsis navigation
- Product detail view (image, description, rating, stock status, discount)

---

## Getting Started

### Prerequisites

- **Node.js** v20 or higher — check with `node -v`
- **npm** v10 or higher — check with `npm -v`

### 1. Clone the repository

```bash
git clone https://github.com/rejtg21/ersatzteilstore24.git
cd ersatzteilstore24
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Or create it manually with the following content:

```env
VITE_API_BASE_URL=https://dummyjson.com
```

> All Vite client-side environment variables must be prefixed with `VITE_`.

### 4. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## Project Structure

```
src/
├── app/
│   ├── config/          # Redux store, app config (env vars)
│   ├── reducers/
│   │   └── products/    # ProductsApi (RTK Query) + ProductsReducer
│   ├── components/
│   │   └── home/
│   │       └── catalog/ # CatalogPage, ProductCard, ProductDetailPage
│   └── shared/
│       └── hooks/       # useDebounce
└── main.tsx
```

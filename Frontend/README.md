# The-Book-Basqet-Frontend

React front-end for The Book Basqet storefront and admin portal.

## Pages
- Storefront: home, shop, categories, about, contact, privacy, terms.
- Auth: login and register for shoppers.
- Admin: login and dashboard for inventory, categories, and orders.

## Scripts
- `npm run dev` to start the local development server.
- `npm run build` to create a production build.
- `npm run preview` to preview the production build.

## Environment
Set `VITE_API_BASE_URL` to point at the Book Basqet API (defaults to `/api` for same-origin usage). Create a `.env` file if needed:

```\nVITE_API_BASE_URL=http://localhost:5000/api\n```

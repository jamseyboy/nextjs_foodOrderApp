# 🍔 Food Order App — Frontend (Next.js)

A Next.js (App Router) front end for the food-ordering system. It lets a "seller" create food items and customers, take orders, update order status, and view a daily order summary — all backed by the [Django REST API](https://github.com/jamseyboy/django_foodOrderApp/tree/main).

---

## Tech Stack

- **Next.js 15** (App Router, Turbopack dev server)
- **React 19**
- **Tailwind CSS 3**
- Plain `fetch`-based API client (no external HTTP library)

---

## Project Structure

```
nextjs_foodOrderApp-main/
├── next.config.mjs
├── tailwind.config.js
├── package.json
└── src/
    ├── app/
    │   ├── page.js                       # Home page
    │   ├── layout.js
    │   ├── foods/page.jsx                 # Manage food items
    │   ├── seller/page.jsx                # Seller dashboard
    │   ├── orders/
    │   │   ├── page.jsx                    # Orders list
    │   │   ├── createOrders/page.jsx       # Create an order
    │   │   └── createCustomer/page.jsx     # Create a customer
    │   └── TodayorderDetails/page.jsx     # Today's orders, grouped by customer
    ├── components/                       # FoodForm, OrderForm, OrderTable, etc.
    ├── config/
    │   └── defaults.jsx                  # Reads NEXT_PUBLIC_DJANGO_BASE_URL
    └── lib/
        └── api.js                        # All fetch calls to the Django API
```

---

## Prerequisites

- Node.js **18.18+** (Next.js 15 requirement)
- npm (or yarn / pnpm / bun)
- The [Django backend](../django_foodOrderApp-main) running locally or deployed somewhere reachable

---

## 1. Local Setup

```bash
git clone https://github.com/jamseyboy/nextjs_foodOrderApp.git
cd nextjs_foodOrderApp
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_DJANGO_BASE_URL=http://localhost:8000
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_DJANGO_BASE_URL` | ✅ | Base URL of the Django backend, **no trailing slash**. All API calls in `src/lib/api.js` append `/api/...` to this value. |

> This variable is prefixed with `NEXT_PUBLIC_` so it's exposed to the browser — required since API calls are made client-side. Don't put secrets in `NEXT_PUBLIC_*` variables.

### Run the dev server

```bash
npm run dev
```

Visit **http://localhost:3000**.

Make sure the backend's `CORS_ALLOWED_ORIGINS` includes `http://localhost:3000` (see the backend README), or browser requests will be blocked by CORS.

---

## 2. Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve the production build (run `build` first) |
| `npm run lint` | Run ESLint |

---

## 3. App Routes

| Route | Purpose |
|---|---|
| `/` | Home page |
| `/foods` | View / add food items |
| `/seller` | Seller dashboard |
| `/orders` | List all orders |
| `/orders/createOrders` | Start a new order for a customer |
| `/orders/createCustomer` | Register a new customer |
| `/TodayorderDetails` | Today's orders, grouped by customer |

---

## 4. API Client

All backend communication lives in `src/lib/api.js` and targets the Django Ninja API under `${NEXT_PUBLIC_DJANGO_BASE_URL}/api/...`:

- `getOrderList()` → `GET /api/customer/orderslist`
- `getTodayOrderDetailList()` → `GET /api/customer/todays_detail_order_list`
- `submitOrder(data)` → `POST /api/customer/create_order_item`
- `updateOrderStatus(data)` → `POST /api/customer/update_order_status`
- `fetchFoodInfo()` → `GET /api/food/todays_food`
- `submitUsername(data)` → `POST /api/customer/create_customer`
- `initiateOrder(data)` → `POST /api/customer/create_orders`

If you rename or move backend routes, update this file accordingly.

---

## Deployment

This project deploys cleanly to **Railway** as a Node service (or to Vercel, if preferred). See [RAILWAY_DEPLOYMENT_GUIDE.md](https://github.com/jamseyboy/nextjs_foodOrderApp/blob/main/RAILWAY_DEPLOYMENT_GUIDE.md) for the full walkthrough of deploying this frontend alongside the Django backend on Railway, including how to wire `NEXT_PUBLIC_DJANGO_BASE_URL` to the backend's public Railway domain.

---

## License

MIT

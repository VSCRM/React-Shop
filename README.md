# 🛍️ React Shop

A fully functional e-commerce single-page application built with React 19. Browse products, manage your cart, place orders, and track deliveries — all powered by a live REST API backend.

**Live demo:** [vscrm.github.io/React-Shop](https://vscrm.github.io/React-Shop/)
**Backend repository:** [React-Shop-Backend](https://github.com/VSCRM/React-Shop-Backend)

---

## 📸 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Product catalog with search and add-to-cart |
| Checkout | `/checkout` | Cart review, delivery options, order placement |
| Orders | `/orders` | Order history with buy-again functionality |
| Tracking | `/tracking/:orderId` | Real-time delivery tracking progress |

---

## 🚀 Tech Stack

### Core

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19 | UI library with the latest concurrent features |
| [React Router](https://reactrouter.com/) | 7 | Client-side routing with `BrowserRouter` and `basename` support |
| [Vite](https://vite.dev/) | 8 | Build tool and dev server with HMR and proxy support |

### Data & Utilities

| Library | Version | Purpose |
|---|---|---|
| [Axios](https://axios-http.com/) | 1.x | HTTP client for all API requests via a shared `api.js` instance |
| [Day.js](https://day.js.org/) | 1.x | Lightweight date formatting for delivery and order dates |

### Testing

| Library | Purpose |
|---|---|
| [Vitest](https://vitest.dev/) | Unit test runner (Vite-native, Jest-compatible) |
| [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) | Component rendering and querying in tests |
| [@testing-library/user-event](https://testing-library.com/docs/user-event/intro/) | Simulates real user interactions |
| [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) | Custom DOM matchers (`toBeInTheDocument`, etc.) |
| [jsdom](https://github.com/jsdom/jsdom) | Browser environment simulation for Node.js |

### Dev & Deployment

| Tool | Purpose |
|---|---|
| [ESLint](https://eslint.org/) | Code linting with React Hooks and React Refresh plugins |
| [gh-pages](https://github.com/tschaub/gh-pages) | Automated deployment to GitHub Pages from the `dist` folder |

---

## 🏗️ Project Structure

```
src/
├── components/          # Shared UI components (Header, Search, ErrorBoundary)
├── context/             # CartContext + CartProvider (global cart state)
├── hooks/               # Custom React hooks
│   ├── useCart.js           # Cart state aggregator
│   ├── useCartActions.js    # Add / remove / update cart items
│   ├── useCartData.js       # Fetches cart from API
│   ├── useCartItemHandlers.js
│   ├── useProducts.js       # Fetches product catalog
│   ├── useOrder.js          # Fetches single order
│   ├── useOrders.js         # Fetches order history
│   ├── useDeliveryOptions.js
│   ├── usePaymentSummary.js
│   ├── useFlashMessage.js   # Temporary "Added to cart" notification
│   ├── useHeaderSearch.js   # Search input state and filtering
│   ├── useDebounce.js       # Debounces search input
│   └── useBuyAgain.js       # Re-adds a past order item to cart
├── pages/
│   ├── home/            # HomePage, ProductCard, ProductRating, ProductQuantity
│   ├── checkout/        # CheckoutPage, CartItemDetails, DeliveryOptions, PaymentSummary
│   ├── order/           # OrdersPage, OrderDetail, BuyAgainPicker
│   └── tracking/        # TrackingPage, TrackingProgress, TrackingStatusMessage
├── services/            # API call wrappers (addToCart, createOrder, deleteCartItem, …)
├── utils/               # imageUrl helpers (staticImage / apiImage)
└── main.jsx             # App entry point with BrowserRouter + CartProvider
```

---

## ✨ Key Features

- **Product catalog** with live search (debounced) and quantity selector
- **Persistent cart** — stored on the server, survives page refresh
- **Delivery options** — multiple shipping speeds with dynamic price calculation
- **Order placement** with full payment summary breakdown
- **Order history** with buy-again shortcut
- **Delivery tracking** with visual progress bar and status messages
- **Error Boundary** — catches runtime errors and displays a graceful fallback
- **Fully tested** — hooks, services, and components covered with unit tests

---

## ⚙️ Environment Variables

Create a `.env.production` file in the project root:

```env
VITE_API_URL=https://your-backend.onrender.com
```

For local development the Vite proxy handles `/api` and `/images` automatically — no env variable needed.

---

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start dev server (proxies /api and /images to localhost:3000)
npm run dev

# Run tests
npx vitest

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## 🌐 Deployment

The frontend is deployed to **GitHub Pages** via the `gh-pages` package.

```bash
npm run deploy
# Builds the project and pushes /dist to the gh-pages branch automatically
```

`vite.config.js` is configured with `base: '/React-Shop/'` to match the GitHub Pages URL structure.

---

## 🙏 Acknowledgements

This project was built while following the **SuperSimpleDev** React course — a fantastic, hands-on resource for learning modern React from scratch.

- 📺 **Course video:** [youtube.com/watch?v=TtPXvEcE11E](https://youtu.be/TtPXvEcE11E?si=Om1vAbjBfCw82JCQ)
- 💻 **GitHub:** [github.com/SuperSimpleDev/react-course](https://github.com/SuperSimpleDev/react-course)

A huge thank you to the SuperSimpleDev team for the clear explanations, well-structured content, and the open-source course materials that made this project possible. 🎉

---

## 📄 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

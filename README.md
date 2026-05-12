# 🛍️ React Shop — TypeScript Edition

A fully functional e-commerce single-page application built with **React 19** and **TypeScript**. This is the TypeScript version of the project — all components, hooks, services, and utilities are fully typed with strict mode enabled.

**Live demo:** [vscrm.github.io/React-Shop](https://vscrm.github.io/React-Shop/)
**Backend repository:** [React-Shop-Backend](https://github.com/VSCRM/React-Shop-Backend)

> 🔀 **Branches:**
> `main` — JavaScript version
> `typescript-version` — this branch, full TypeScript

---

## 📸 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Product catalog with search and add-to-cart |
| Checkout | `/checkout` | Cart review, delivery options, order placement |
| Orders | `/orders` | Order history with buy-again functionality |
| Tracking | `/tracking/:orderId/:productId?` | Real-time delivery tracking progress |

---

## 🚀 Tech Stack

### Core

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19 | UI library with the latest concurrent features |
| [TypeScript](https://www.typescriptlang.org/) | 6 | Static typing with strict mode enabled |
| [React Router](https://reactrouter.com/) | 7 | Client-side routing with `BrowserRouter` and `basename` support |
| [Vite](https://vite.dev/) | 8 | Build tool and dev server with HMR |

### Data & Utilities

| Library | Version | Purpose |
|---|---|---|
| [Axios](https://axios-http.com/) | 1.x | HTTP client for all API requests via a shared `api.ts` instance |
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
React-Shop/
├── public/                          # Static assets served as-is by Vite (not bundled).
│   │                                # Contains UI icons and logo images used directly
│   │                                # in JSX via staticImage() helper.
│   │                                # Product images and ratings are served by the
│   │                                # backend (Render.com) and are not included here.
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.tsx
│   │   ├── ErrorBoundary.test.tsx
│   │   ├── HeaderLogo.tsx
│   │   ├── HeaderNav.tsx
│   │   ├── HeaderSearch.tsx
│   │   ├── SearchButton.tsx
│   │   └── SearchInput.tsx
│   ├── context/
│   │   ├── CartContext.tsx
│   │   ├── CartProvider.tsx
│   │   └── CartProvider.test.tsx
│   ├── hooks/
│   │   ├── useBuyAgain.ts
│   │   ├── useBuyAgain.test.ts
│   │   ├── useCart.ts
│   │   ├── useCartActions.ts
│   │   ├── useCartActions.test.tsx
│   │   ├── useCartContext.ts
│   │   ├── useCartContext.test.tsx
│   │   ├── useCartData.ts
│   │   ├── useCartData.test.ts
│   │   ├── useCartItemHandlers.ts
│   │   ├── useCartItemHandlers.test.ts
│   │   ├── useDebounce.ts
│   │   ├── useDebounce.test.ts
│   │   ├── useDeliveryOptions.ts
│   │   ├── useDeliveryOptions.test.ts
│   │   ├── useFlashMessage.ts
│   │   ├── useFlashMessage.test.ts
│   │   ├── useHeaderSearch.ts
│   │   ├── useHeaderSearch.test.tsx
│   │   ├── useOrder.ts
│   │   ├── useOrders.ts
│   │   ├── usePaymentSummary.ts
│   │   ├── useProducts.ts
│   │   └── useProducts.test.ts
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Header.css
│   ├── pages/
│   │   ├── home/
│   │   │   ├── AddedMessage.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── HomePage.css
│   │   │   ├── NoSearchResults.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductCard.test.tsx
│   │   │   ├── ProductQuantity.tsx
│   │   │   ├── ProductRating.tsx
│   │   │   └── ProductsGrid.tsx
│   │   ├── checkout/
│   │   │   ├── CartItemActions.tsx
│   │   │   ├── CartItemDetails.tsx
│   │   │   ├── CheckoutHeader.tsx
│   │   │   ├── CheckoutHeader.css
│   │   │   ├── CheckoutPage.tsx
│   │   │   ├── CheckoutPage.css
│   │   │   ├── DeleteConfirm.tsx
│   │   │   ├── DeliveryDate.tsx
│   │   │   ├── DeliveryOptions.tsx
│   │   │   ├── OrderSummary.tsx
│   │   │   ├── PaymentSummary.tsx
│   │   │   ├── QuantityDisplay.tsx
│   │   │   └── QuantityEditor.tsx
│   │   ├── order/
│   │   │   ├── BuyAgainPicker.tsx
│   │   │   ├── OrderContainer.tsx
│   │   │   ├── OrderDetail.tsx
│   │   │   ├── OrderHeader.tsx
│   │   │   ├── OrdersPage.tsx
│   │   │   ├── OrdersPage.css
│   │   │   ├── ProductActions.tsx
│   │   │   ├── ProductDetails.tsx
│   │   │   └── ProductInfo.tsx
│   │   └── tracking/
│   │       ├── TrackingDeliveryHeader.tsx
│   │       ├── TrackingItem.tsx
│   │       ├── TrackingPage.tsx
│   │       ├── TrackingPage.css
│   │       ├── TrackingProductInfo.tsx
│   │       ├── TrackingProgress.tsx
│   │       └── TrackingStatusMessage.tsx
│   ├── services/
│   │   ├── addToCart.ts
│   │   ├── api.ts
│   │   ├── api.test.ts
│   │   ├── createOrder.ts
│   │   ├── deleteCartItem.ts
│   │   ├── loadToCart.ts
│   │   ├── updateCartDelivery.ts
│   │   └── updateCartQuantity.ts
│   ├── types/
│   │   └── index.ts                 # All shared interfaces and types
│   │                                # (Product, CartItem, Order, DeliveryOption,
│   │                                #  PaymentSummary, TrackingStatus, CartContextValue)
│   ├── utils/
│   │   ├── computeStatus.ts
│   │   ├── computeStatus.test.ts
│   │   ├── constants.ts
│   │   ├── getTrackedProducts.ts
│   │   ├── getTrackedProducts.test.ts
│   │   ├── imageUrl.ts
│   │   ├── money.ts
│   │   ├── money.test.ts
│   │   ├── searchUtils.ts
│   │   └── searchUtils.test.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts                # <reference types="vite/client" />
├── .editorconfig
├── .env                             # Local development API URL (git-ignored)
├── .env.example                     # Template for environment variables
├── .env.production                  # Production API URL (committed)
├── .gitignore
├── eslint.config.ts
├── index.html
├── jsconfig.json
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── setupTests.ts                    # Imports jest-dom matchers for all tests
├── tsconfig.json                    # TypeScript config with strict mode and path aliases
├── tsconfig.node.json
└── vite.config.ts                   # Build config, proxy, base path, test env
```

---

## 🔷 TypeScript Architecture

All domain types are defined in `src/types/index.ts` and imported across the codebase:

```ts
// Key types
interface Product { id: string; name: string; image: string; priceCents: number; rating: Rating; }
interface CartItem { productId: string; quantity: number; deliveryOptionId: string; product: Product; }
interface Order { id: string; orderTimeMs: number; totalCostCents: number; products: OrderProduct[]; }
type TrackingStatus = 'Preparing' | 'Shipped' | 'Delivered';
interface CartContextValue { cart: CartItem[]; addCart: (...) => Promise<void>; ... }
```

`useDebounce` is a generic hook:
```ts
function useDebounce<T>(rawValue: T, delayMs?: number): T
```

`useFlashMessage` returns a typed tuple:
```ts
function useFlashMessage(duration?: number): [boolean, () => void]
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

Create a `.env` file in the project root for local development:

```env
VITE_API_URL=http://localhost:3000
```

`.env.production` is committed and used automatically during `npm run build` / `npm run deploy`:

```env
VITE_API_URL=https://react-shop-backend-jg62.onrender.com
```

---

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Type check
npx tsc --noEmit

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

`vite.config.ts` is configured with `base: '/React-Shop/'` to match the GitHub Pages URL structure.

---

## 🙏 Acknowledgements

This project was built while following the **SuperSimpleDev** React course — a fantastic, hands-on resource for learning modern React from scratch.

- 📺 **Course video:** [youtube.com/watch?v=TtPXvEcE11E](https://youtu.be/TtPXvEcE11E?si=Om1vAbjBfCw82JCQ)
- 💻 **GitHub:** [github.com/SuperSimpleDev/react-course](https://github.com/SuperSimpleDev/react-course)

A huge thank you to the SuperSimpleDev team for the clear explanations, well-structured content, and the open-source course materials that made this project possible. 🎉

---

## 📄 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

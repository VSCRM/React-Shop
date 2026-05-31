# React Shop — Production-Ready TypeScript Refactor

A full-stack e-commerce React application refactored to be **production-ready**, **fully type-safe**, and **100% tested** with Vitest and React Testing Library.

**Live demo:** [vscrm.github.io/React-Shop](https://vscrm.github.io/React-Shop/)
**Backend repository:** [React-Shop-Backend](https://github.com/VSCRM/React-Shop-Backend)

---

## Table of Contents

1. [Pages](#pages)
2. [Tech Stack](#tech-stack)
3. [Quick Start](#quick-start)
4. [Environment Variables](#environment-variables)
5. [Running the Test Suite](#running-the-test-suite)
6. [Architectural Changes](#architectural-changes)
7. [Zod Integration — Runtime Validation](#zod-integration--runtime-validation)
8. [Component & Module Breakdown](#component--module-breakdown)
9. [Project Structure](#project-structure)
10. [Added & Changed Dependencies](#added--changed-dependencies)
11. [Type Safety Guidelines](#type-safety-guidelines)
12. [Test Coverage Map](#test-coverage-map)
13. [Acknowledgements](#acknowledgements)
14. [License](#license)

---

## 📸 Pages

| Page     | Route                            | Description                                    |
| -------- | -------------------------------- | ---------------------------------------------- |
| Home     | `/`                              | Product catalog with search and add-to-cart    |
| Checkout | `/checkout`                      | Cart review, delivery options, order placement |
| Orders   | `/orders`                        | Order history with buy-again functionality     |
| Tracking | `/tracking/:orderId/:productId?` | Real-time delivery tracking progress           |

---

## 🚀 Tech Stack

### Core

| Technology                                    | Version | Purpose                                                         |
| --------------------------------------------- | ------- | --------------------------------------------------------------- |
| [React](https://react.dev/)                   | 19      | UI library with the latest concurrent features                  |
| [TypeScript](https://www.typescriptlang.org/) | 6       | Static typing with strict mode enabled                          |
| [React Router](https://reactrouter.com/)      | 7       | Client-side routing with `BrowserRouter` and `basename` support |
| [Vite](https://vite.dev/)                     | 8       | Build tool and dev server with HMR                              |

### Data & Validation

| Library                          | Version | Purpose                                                         |
| -------------------------------- | ------- | --------------------------------------------------------------- |
| [Axios](https://axios-http.com/) | 1.x     | HTTP client for all API requests via a shared `api.ts` instance |
| [Zod](https://zod.dev/)          | 3.x     | Runtime schema validation and TypeScript type inference ✨ New  |
| [Day.js](https://day.js.org/)    | 1.x     | Lightweight date formatting for delivery and order dates        |

### Testing

| Library                                                                                 | Purpose                                         |
| --------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [Vitest](https://vitest.dev/)                                                           | Unit test runner (Vite-native, Jest-compatible) |
| [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) | Component rendering and querying in tests       |
| [@testing-library/user-event](https://testing-library.com/docs/user-event/intro/)       | Simulates real user interactions                |
| [@testing-library/jest-dom](https://github.com/testing-library/jest-dom)                | Custom DOM matchers (`toBeInTheDocument`, etc.) |
| [jsdom](https://github.com/jsdom/jsdom)                                                 | Browser environment simulation for Node.js      |

### Dev & Deployment

| Tool                                            | Purpose                                                     |
| ----------------------------------------------- | ----------------------------------------------------------- |
| [ESLint](https://eslint.org/)                   | Code linting with React Hooks and React Refresh plugins     |
| [gh-pages](https://github.com/tschaub/gh-pages) | Automated deployment to GitHub Pages from the `dist` folder |

---

## Quick Start

```bash
# Install project dependencies
npm install

# Run linter to check for code style and errors
npm run lint

# Start development server (proxies /api and /images to localhost:3000)
npm run dev

# Run tests once
npm run test

# Run tests in watch mode for development
npm run test:watch

# Run tests and generate code coverage report
npm run test:coverage

# Build production-ready assets into the dist folder
npm run build

# Locally preview the production build
npm run preview

# Build and deploy the application to GitHub Pages
npm run deploy
```

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

## Running the Test Suite

| Command                 | Description                     |
| ----------------------- | ------------------------------- |
| `npm test`              | Run all tests once (CI mode)    |
| `npm run test:watch`    | Run in watch mode (development) |
| `npm run test:coverage` | Run with V8 coverage report     |

### Expected output

```
 ✓ src/schemas/index.test.ts              (56 tests)
 ✓ src/hooks/useProducts.test.ts          (14 tests)
 ✓ src/hooks/useCartActions.test.tsx      (12 tests)
 ✓ src/services/api.test.ts               (12 tests)
 ✓ src/hooks/useDeliveryOptions.test.ts   (11 tests)
 ✓ src/hooks/useBuyAgain.test.ts          (11 tests)
 ✓ src/pages/home/ProductCard.test.tsx    (11 tests)
 ✓ src/components/ErrorBoundary.test.tsx  (8 tests)
 ✓ src/hooks/useCartItemHandlers.test.ts  (8 tests)
 ✓ src/hooks/useCartData.test.ts          (8 tests)
 ✓ src/hooks/useHeaderSearch.test.tsx     (10 tests)
 ✓ src/context/CartProvider.test.tsx      (3 tests)
 ✓ src/hooks/useFlashMessage.test.ts      (6 tests)
 ✓ src/utils/getTrackedProducts.test.ts   (6 tests)
 ✓ src/hooks/useCartContext.test.tsx      (3 tests)
 ✓ src/hooks/useDebounce.test.ts          (5 tests)
 ✓ src/utils/computeStatus.test.ts        (7 tests)
 ✓ src/utils/searchUtils.test.ts          (6 tests)
 ✓ src/utils/money.test.ts                (6 tests)

 Test Files  19 passed                    (19)
       Tests 203 passed                   (203)
```

---

## Architectural Changes

### 1. Zod as the Single Source of Truth

**Before:** TypeScript interfaces in `src/types/index.ts` were manually defined and duplicated runtime shape expectations.

**After:** All domain types are **derived from Zod schemas** via `z.infer`:

```
src/schemas/index.ts   ← Zod schemas (runtime validation)
       ↓ z.infer
src/types/index.ts     ← TypeScript types (static typing)
```

Change a schema once — both runtime validation and static types update automatically.

### 2. Runtime Validation at API Boundaries

Every data-fetching function now calls `Schema.parse(response.data)` before returning. If the server sends unexpected data (missing fields, wrong types, out-of-range values), a `ZodError` is thrown immediately and the hook's `catch` block converts it to a user-facing error message.

**Affected services:**

| Service       | Schema used          |
| ------------- | -------------------- |
| `loadToCart`  | `CartItemListSchema` |
| `createOrder` | `CreatedOrderSchema` |

**Affected hooks:**

| Hook                 | Schema used                |
| -------------------- | -------------------------- |
| `useProducts`        | `ProductListSchema`        |
| `useDeliveryOptions` | `DeliveryOptionListSchema` |
| `useOrders`          | `OrderListSchema`          |
| `useOrder`           | `OrderSchema`              |
| `usePaymentSummary`  | `PaymentSummarySchema`     |

### 3. Strict TypeScript Configuration

`tsconfig.json` enforces:

```json
{
	"strict": true,
	"noUnusedLocals": true,
	"noUnusedParameters": true,
	"noFallthroughCasesInSwitch": true
}
```

All function arguments, return types, React component props, custom hook return types, and event handlers are **explicitly typed**. `any` and `unknown` are banned from application code — Zod handles the `unknown` → validated type boundary.

### 4. Explicit Hook Interfaces

`useProducts` (and all other data-fetching hooks) now return an explicit result interface, making the contract clear to consumers without reading the implementation.

### 5. JSDoc on All Public APIs

Every exported function, hook, schema, and type has a JSDoc comment documenting its purpose, parameters, return value, and possible thrown errors (`@throws`).

---

## Zod Integration — Runtime Validation

### Schema file: `src/schemas/index.ts`

```
RatingSchema               → { stars: 0–5, count: int ≥ 0 }
ProductSchema              → a single product
ProductListSchema          → z.array(ProductSchema)
DeliveryOptionSchema       → a delivery option
DeliveryOptionListSchema   → z.array(DeliveryOptionSchema)
CartItemSchema             → a cart item (embeds ProductSchema)
CartItemListSchema         → z.array(CartItemSchema)
OrderProductSchema         → a product inside an order
OrderSchema                → a full order (embeds OrderProductSchema[])
OrderListSchema            → z.array(OrderSchema)
CreatedOrderSchema         → POST /api/orders response
PaymentSummarySchema       → checkout cost breakdown
```

### Usage pattern in services

```typescript
// Before — no runtime validation
const response = await api.get<CartItem[]>("/api/cart-items?expand=product");
return response.data; // trusted blindly

// After — Zod validates before returning
const response = await api.get<unknown>("/api/cart-items?expand=product");
return CartItemListSchema.parse(response.data); // throws ZodError on bad data
```

### Handling Zod errors in hooks

All data-fetching hooks catch both network errors and Zod parse errors in the same `catch` block:

```typescript
try {
	const validated = SomeSchema.parse(response.data);
	setData(validated);
} catch {
	// Catches ZodError (bad API data) AND AxiosError (network failure)
	setError("Could not load data. Please try again.");
}
```

---

## Component & Module Breakdown

### `src/schemas/`

| File            | Responsibility                                                  |
| --------------- | --------------------------------------------------------------- |
| `index.ts`      | All Zod validation schemas — single source of truth             |
| `index.test.ts` | 56 tests: valid data, invalid data, edge cases for every schema |

### `src/types/`

| File       | Responsibility                                                      |
| ---------- | ------------------------------------------------------------------- |
| `index.ts` | TypeScript types derived from schemas via `z.infer` + UI-only types |

### `src/services/`

| File                    | Method | Endpoint                         | Zod validation          |
| ----------------------- | ------ | -------------------------------- | ----------------------- |
| `api.ts`                | —      | Axios instance factory           | —                       |
| `addToCart.ts`          | POST   | `/api/cart-items`                | No (mutation)           |
| `loadToCart.ts`         | GET    | `/api/cart-items?expand=product` | ✅ `CartItemListSchema` |
| `updateCartQuantity.ts` | PUT    | `/api/cart-items/:id`            | No (mutation)           |
| `updateCartDelivery.ts` | PUT    | `/api/cart-items/:id`            | No (mutation)           |
| `deleteCartItem.ts`     | DELETE | `/api/cart-items/:id`            | No (mutation)           |
| `createOrder.ts`        | POST   | `/api/orders`                    | ✅ `CreatedOrderSchema` |

### `src/hooks/`

| Hook                  | Responsibility                                                     |
| --------------------- | ------------------------------------------------------------------ |
| `useCart`             | Composes `useCartData` + `useCartActions` into the full cart API   |
| `useCartData`         | Raw cart state: initial load, `setCart`, manual `loadCart`         |
| `useCartActions`      | All cart mutation operations (add, update, remove, order)          |
| `useCartContext`      | Type-safe access to `CartContext`; throws if used outside provider |
| `useCartItemHandlers` | UI state for a single checkout row (editing, delete confirm)       |
| `useProducts`         | Products list with search, loading & error states + Zod validation |
| `useDeliveryOptions`  | Delivery options fetch + Zod validation                            |
| `useOrders`           | Orders list fetch + Zod validation                                 |
| `useOrder`            | Single order fetch by ID + Zod validation                          |
| `usePaymentSummary`   | Payment summary fetch triggered by cart changes + Zod validation   |
| `useBuyAgain`         | "Buy again" picker state for the orders page                       |
| `useFlashMessage`     | Timed boolean flag (e.g. "Added to cart" flash)                    |
| `useDebounce`         | Generic debounce for search input                                  |
| `useHeaderSearch`     | Header search bar: input, submit, clear, URL sync                  |

### `src/context/`

| File               | Responsibility                                                 |
| ------------------ | -------------------------------------------------------------- |
| `CartContext.tsx`  | Creates the `CartContext` with `CartContextValue \| undefined` |
| `CartProvider.tsx` | Wraps children with the cart context populated from `useCart`  |

### `src/components/`

| File                | Responsibility                                                         |
| ------------------- | ---------------------------------------------------------------------- |
| `ErrorBoundary.tsx` | Class component error boundary; supports custom `fallback` render-prop |
| `HeaderLogo.tsx`    | Site logo with responsive images                                       |
| `HeaderNav.tsx`     | Navigation links + cart item count                                     |
| `HeaderSearch.tsx`  | Search bar composition (SearchInput + SearchButton)                    |
| `SearchInput.tsx`   | Controlled input element                                               |
| `SearchButton.tsx`  | Submit / clear toggle button                                           |

### `src/utils/`

| File                    | Responsibility                                                  |
| ----------------------- | --------------------------------------------------------------- |
| `constants.ts`          | App-wide constants (search key, debounce delay, tracking steps) |
| `computeStatus.ts`      | Derives `TrackingStatus` from timestamps                        |
| `getTrackedProducts.ts` | Filters order products by optional productId                    |
| `imageUrl.ts`           | Builds absolute URLs for API images and static assets           |
| `money.ts`              | `formatMoney(cents)` → `"$X.XX"`                                |
| `searchUtils.ts`        | `buildSearchPath(value)` → URL string                           |

---

## 🏗️ Project Structure

```
React-Shop/
├── public/                                # Static assets served as-is by Vite (not bundled).
│   │                                      # Contains UI icons and logo images used directly
│   │                                      # in JSX via staticImage() helper.
│   │                                      # Product images and ratings are served by the
│   │                                      # backend (Render.com) and are not included here.
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.test.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── HeaderLogo.tsx
│   │   ├── HeaderNav.tsx
│   │   ├── HeaderSearch.tsx
│   │   ├── SearchButton.tsx
│   │   └── SearchInput.tsx
│   ├── context/
│   │   ├── CartContext.tsx
│   │   └── CartProvider.test.tsx
│   │   └── CartProvider.tsx
│   ├── hooks/
│   │   ├── useBuyAgain.test.ts
│   │   ├── useBuyAgain.ts
│   │   ├── useCart.ts
│   │   ├── useCartActions.test.tsx         # REFACTORED
│   │   ├── useCartActions.ts
│   │   ├── useCartContext.test.tsx
│   │   ├── useCartData.test.ts             # REFACTORED
│   │   ├── useCartData.ts
│   │   ├── useCartItemHandlers.test.ts
│   │   ├── useCartItemHandlers.ts
│   │   ├── useDebounce.test.ts
│   │   ├── useDebounce.ts
│   │   ├── useDeliveryOptions.test.ts      # REFACTORED
│   │   ├── useDeliveryOptions.ts           # now validates with Zod ✨ REFACTORED
│   │   ├── useFlashMessage.test.ts
│   │   ├── useFlashMessage.ts
│   │   ├── useHeaderSearch.test.tsx
│   │   ├── useHeaderSearch.ts
│   │   ├── useOrder.ts                     # now validates with Zod ✨ REFACTORED
│   │   ├── useOrders.ts                    # now validates with Zod ✨ REFACTORED
│   │   ├── usePaymentSummary.ts            # now validates with Zod ✨ REFACTORED
│   │   ├── useProducts.test.ts             # REFACTORED
│   │   └── useProducts.ts                  # now validates with Zod ✨ REFACTORED
│   ├── layout/
│   │   ├── Header.css
│   │   └── Header.tsx
│   ├── pages/
│   │   ├── checkout/
│   │   │   ├── CartItemActions.tsx
│   │   │   ├── CartItemDetails.tsx
│   │   │   ├── CheckoutHeader.css
│   │   │   ├── CheckoutHeader.tsx
│   │   │   ├── CheckoutPage.css
│   │   │   ├── CheckoutPage.tsx
│   │   │   ├── DeleteConfirm.tsx
│   │   │   ├── DeliveryDate.tsx
│   │   │   ├── DeliveryOptions.tsx
│   │   │   ├── OrderSummary.tsx
│   │   │   ├── PaymentSummary.tsx
│   │   │   ├── QuantityDisplay.tsx
│   │   │   └── QuantityEditor.tsx
│   │   ├── home/
│   │   │   ├── AddedMessage.tsx
│   │   │   ├── HomePage.css
│   │   │   ├── HomePage.tsx
│   │   │   ├── NoSearchResults.tsx
│   │   │   ├── ProductCard.test.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductQuantity.tsx
│   │   │   ├── ProductRating.tsx
│   │   │   └── ProductsGrid.tsx
│   │   ├── order/
│   │   │   ├── BuyAgainPicker.tsx
│   │   │   ├── OrderContainer.tsx
│   │   │   ├── OrderDetail.tsx
│   │   │   ├── OrderHeader.tsx
│   │   │   ├── OrdersPage.css
│   │   │   ├── OrdersPage.tsx
│   │   │   ├── ProductActions.tsx
│   │   │   ├── ProductDetails.tsx
│   │   │   └── ProductInfo.tsx
│   │   └── tracking/
│   │       ├── TrackingDeliveryHeader.tsx
│   │       ├── TrackingItem.tsx
│   │       ├── TrackingPage.css
│   │       ├── TrackingPage.tsx
│   │       ├── TrackingProductInfo.tsx
│   │       ├── TrackingProgress.tsx
│   │       └── TrackingStatusMessage.tsx
│   ├── schemas/
│   │   ├── index.test.ts                   # 56 schema tests ✨ NEW
│   │   └── index.ts                        # Zod schemas (single source of truth) ✨ NEW
│   ├── services/
│   │   ├── addToCart.ts
│   │   ├── api.test.ts                     # includes Zod rejection tests ✨ REFACTORED
│   │   ├── api.ts
│   │   ├── createOrder.ts                  # now validates with CreatedOrderSchema ✨ REFACTORED
│   │   ├── deleteCartItem.ts
│   │   ├── loadToCart.ts                   # now validates with CartItemListSchema ✨ REFACTORED
│   │   ├── updateCartDelivery.ts
│   │   └── updateCartQuantity.ts
│   ├── types/
│   │   └── index.ts                        # z.infer-derived types ✨ REFACTORED
│   ├── utils/
│   │   ├── computeStatus.test.ts
│   │   ├── computeStatus.ts
│   │   ├── constants.ts
│   │   ├── getTrackedProducts.test.ts
│   │   ├── getTrackedProducts.ts
│   │   ├── imageUrl.ts
│   │   ├── money.test.ts
│   │   ├── money.ts
│   │   ├── searchUtils.test.ts
│   │   └── searchUtils.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts                       # <reference types="vite/client" />
├── .editorconfig
├── .env                                    # Local development API URL (git-ignored)
├── .env.example                            # Template for environment variables
├── .env.production                         # Production API URL (committed)
├── .gitignore
├── eslint.config.ts
├── index.html
├── jsconfig.json
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── setupTests.ts                           # Imports jest-dom matchers for all tests
├── tsconfig.json                           # TypeScript config with strict mode and path aliases
├── tsconfig.node.json
└── vite.config.ts                          # Build config, proxy, base path, test env
```

---

## Added & Changed Dependencies

### New production dependency

| Package | Version   | Reason                                                  |
| ------- | --------- | ------------------------------------------------------- |
| `zod`   | `^3.24.2` | Runtime schema validation and TypeScript type inference |

### Updated `package.json` scripts

```json
{
	"test": "vitest run",
	"test:watch": "vitest",
	"test:coverage": "vitest run --coverage"
}
```

### No removed dependencies

All existing dependencies (`axios`, `dayjs`, `react-router`, etc.) are unchanged.

---

## Type Safety Guidelines

### ✅ Do

```typescript
// Derive types from schemas
import type { z } from 'zod';
import { ProductSchema } from '@/schemas';
type Product = z.infer<typeof ProductSchema>;

// Explicitly type all function signatures
function formatMoney(amountCents: number): string { ... }

// Use schema.parse() at API boundaries
const data = ProductListSchema.parse(response.data);

// Use schema.safeParse() when you need to handle errors gracefully
const result = CartItemSchema.safeParse(raw);
if (!result.success) console.error(result.error.format());
```

### ❌ Don't

```typescript
// Never use `any`
const data: any = response.data;

// Never trust raw API responses without parsing
return response.data as CartItem[];

// Never duplicate type definitions manually when a schema already exists
interface Product {
	id: string; /* ... */
}
```

---

## Test Coverage Map

| Test File                           | What it covers                                                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `schemas/index.test.ts`             | ✅ Valid data accepted · ❌ Invalid data rejected · 🔲 Edge cases (zero prices, boundary stars, empty arrays) |
| `services/api.test.ts`              | HTTP methods & URLs · Zod rejection from `loadToCart` · Zod rejection from `createOrder`                      |
| `hooks/useProducts.test.ts`         | Valid fetch · Zod rejects malformed data · Loading states · Re-fetch on query change                          |
| `hooks/useDeliveryOptions.test.ts`  | Valid fetch · Zod rejects malformed data · Loading/error states                                               |
| `hooks/useCartData.test.ts`         | Initial load · Zod/network error → `cartError` · Manual reload · Optimistic `setCart`                         |
| `hooks/useCartActions.test.tsx`     | addCart · updateDeliveryOption · updateQuantity · removeItem · placeOrder · error swallowing                  |
| `hooks/useCartItemHandlers.test.ts` | isEditing toggle · handleSaveQuantity · handleDeleteOne (qty=1 vs qty>1) · handleDeleteAll                    |
| `hooks/useCartContext.test.tsx`     | Value returned · Same reference · Throws outside provider                                                     |
| `hooks/useBuyAgain.test.ts`         | Initial state · Single-qty direct add · Multi-qty picker flow · confirm · cancel                              |
| `hooks/useFlashMessage.test.ts`     | Inactive initially · Active after trigger · Auto-deactivates · Timer reset                                    |
| `hooks/useDebounce.test.ts`         | Initial value · No update before delay · Updates after delay · Rapid change debounce                          |
| `hooks/useHeaderSearch.test.tsx`    | Initial state · Home page URL sync · Input change · Clear · Form submit                                       |
| `context/CartProvider.test.tsx`     | Cart data provided · Context shape · Children rendered                                                        |
| `components/ErrorBoundary.test.tsx` | Normal render · Default fallback UI · Custom fallback prop · Try-again reset · logging                        |
| `pages/home/ProductCard.test.tsx`   | Name/price/image render · Add to cart · Quantity selector · Flash message                                     |
| `utils/computeStatus.test.ts`       | Delivered (at/past time) · Preparing (<40%) · Shipped (40–99%)                                                |
| `utils/getTrackedProducts.test.ts`  | null order · no products · filter by id · all products                                                        |
| `utils/money.test.ts`               | Various cent values · Dollar sign · 2 decimal places                                                          |
| `utils/searchUtils.test.ts`         | Empty/whitespace → `/` · Query path · URL encoding · Trim                                                     |

---

## 🙏 Acknowledgements

This project was built while following the **SuperSimpleDev** React course — a fantastic, hands-on resource for learning modern React from scratch.

- 📺 **Course video:** [youtube.com/watch?v=TtPXvEcE11E](https://youtu.be/TtPXvEcE11E?si=Om1vAbjBfCw82JCQ)
- 💻 **GitHub:** [github.com/SuperSimpleDev/react-course](https://github.com/SuperSimpleDev/react-course)

---

## 📄 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

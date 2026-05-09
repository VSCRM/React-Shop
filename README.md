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
React-Shop/
├── public/                          # Static assets served as-is by Vite (not bundled).
│   │                                # Contains UI icons and logo images used directly
│   │                                # in JSX via staticImage() helper.
│   │                                # Product images and ratings are served by the
│   │                                # backend (Render.com) and are not included here.
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.jsx        # Catches runtime errors, shows fallback UI
│   │   ├── ErrorBoundary.test.jsx
│   │   ├── HeaderLogo.jsx           # Logo with link to home
│   │   ├── HeaderNav.jsx            # Cart icon and navigation
│   │   ├── HeaderSearch.jsx         # Search bar container
│   │   ├── SearchButton.jsx         # Toggle search icon button
│   │   └── SearchInput.jsx          # Controlled search text input
│   ├── context/
│   │   ├── CartContext.jsx          # React context definition
│   │   ├── CartProvider.jsx         # Context provider with full cart state
│   │   └── CartProvider.test.jsx
│   ├── hooks/
│   │   ├── useBuyAgain.js           # Re-adds a past order item to cart
│   │   ├── useBuyAgain.test.js
│   │   ├── useCart.js               # Aggregates cart state from sub-hooks
│   │   ├── useCartActions.js        # Add / remove / update cart items
│   │   ├── useCartActions.test.jsx
│   │   ├── useCartContext.js        # Reads cart state from context
│   │   ├── useCartContext.test.jsx
│   │   ├── useCartData.js           # Fetches cart items from API
│   │   ├── useCartData.test.js
│   │   ├── useCartItemHandlers.js   # Quantity and delivery change handlers
│   │   ├── useCartItemHandlers.test.js
│   │   ├── useDebounce.js           # Delays value update (search optimisation)
│   │   ├── useDebounce.test.js
│   │   ├── useDeliveryOptions.js    # Fetches delivery options from API
│   │   ├── useDeliveryOptions.test.js
│   │   ├── useFlashMessage.js       # Temporary "Added to cart" notification state
│   │   ├── useFlashMessage.test.js
│   │   ├── useHeaderSearch.js       # Search input state and product filtering
│   │   ├── useHeaderSearch.test.jsx
│   │   ├── useOrder.js              # Fetches a single order by ID
│   │   ├── useOrders.js             # Fetches full order history
│   │   ├── usePaymentSummary.js     # Fetches cart totals from API
│   │   └── useProducts.js           # Fetches product catalog from API
│   │   └── useProducts.test.js
│   ├── layout/
│   │   ├── Header.jsx               # App-wide header with logo, search, cart
│   │   └── Header.css
│   ├── pages/
│   │   ├── home/
│   │   │   ├── AddedMessage.jsx     # "Added to cart" flash notification
│   │   │   ├── HomePage.jsx         # Product catalog page
│   │   │   ├── HomePage.css
│   │   │   ├── NoSearchResults.jsx  # Empty state for search
│   │   │   ├── ProductCard.jsx      # Single product tile with add-to-cart
│   │   │   ├── ProductCard.test.jsx
│   │   │   ├── ProductQuantity.jsx  # Quantity selector dropdown
│   │   │   ├── ProductRating.jsx    # Star rating display
│   │   │   └── ProductsGrid.jsx     # Responsive grid of ProductCards
│   │   ├── checkout/
│   │   │   ├── CartItemActions.jsx  # Update / delete actions per cart item
│   │   │   ├── CartItemDetails.jsx  # Product image, name, price in cart
│   │   │   ├── CheckoutHeader.jsx   # Checkout-specific header with logo
│   │   │   ├── CheckoutHeader.css
│   │   │   ├── CheckoutPage.jsx     # Full checkout page layout
│   │   │   ├── CheckoutPage.css
│   │   │   ├── DeleteConfirm.jsx    # Inline delete confirmation prompt
│   │   │   ├── DeliveryDate.jsx     # Calculated estimated arrival date
│   │   │   ├── DeliveryOptions.jsx  # Shipping speed selector per item
│   │   │   ├── OrderSummary.jsx     # Cart item list with actions
│   │   │   ├── PaymentSummary.jsx   # Totals, tax, and place order button
│   │   │   ├── QuantityDisplay.jsx  # Read-only quantity label
│   │   │   └── QuantityEditor.jsx   # Editable quantity input
│   │   ├── order/
│   │   │   ├── BuyAgainPicker.jsx   # Quantity selector for re-ordering
│   │   │   ├── OrderContainer.jsx   # Wrapper for a single order card
│   │   │   ├── OrderDetail.jsx      # Product list within an order
│   │   │   ├── OrderHeader.jsx      # Order date, total, and ID
│   │   │   ├── OrdersPage.jsx       # Full order history page
│   │   │   ├── OrdersPage.css
│   │   │   ├── ProductActions.jsx   # Track package / buy again buttons
│   │   │   ├── ProductDetails.jsx   # Product name, price in order view
│   │   │   └── ProductInfo.jsx      # Product image and quantity in order
│   │   └── tracking/
│   │       ├── TrackingDeliveryHeader.jsx  # Estimated delivery heading
│   │       ├── TrackingItem.jsx            # Single tracked product card
│   │       ├── TrackingPage.jsx            # Full tracking page
│   │       ├── TrackingPage.css
│   │       ├── TrackingProductInfo.jsx     # Product image, name, quantity
│   │       ├── TrackingProgress.jsx        # Visual progress bar (steps)
│   │       ├── TrackingStatusMessage.jsx   # Current status text
│   │       └── (TrackingPage.css)
│   ├── services/
│   │   ├── addToCart.js             # POST /api/cart-items
│   │   ├── api.js                   # Axios instance with baseURL from env
│   │   ├── api.test.js
│   │   ├── createOrder.js           # POST /api/orders
│   │   ├── deleteCartItem.js        # DELETE /api/cart-items/:id
│   │   ├── loadToCart.js            # Bulk-load items into cart
│   │   ├── updateCartDelivery.js    # PUT delivery option on cart item
│   │   └── updateCartQuantity.js    # PUT quantity on cart item
│   ├── utils/
│   │   ├── computeStatus.js         # Derives tracking status from order date
│   │   ├── computeStatus.test.js
│   │   ├── constants.js             # Shared app-wide constants
│   │   ├── getTrackedProducts.js    # Filters products for tracking page
│   │   ├── getTrackedProducts.test.js
│   │   ├── imageUrl.js              # staticImage() and apiImage() helpers
│   │   ├── money.js                 # Formats cents → currency string
│   │   ├── money.test.js
│   │   ├── searchUtils.js           # Product search/filter logic
│   │   └── searchUtils.test.js
│   ├── App.jsx                      # Route definitions
│   ├── index.css                    # Global styles
│   └── main.jsx                     # Entry point — BrowserRouter + CartProvider
├── .editorconfig
├── .env                             # Local development API URL (committed)
├── .env.example                     # Template for environment variables
├── .env.production                  # Production API URL (committed)
├── .gitignore
├── eslint.config.js
├── index.html
├── jsconfig.json                    # Path aliases (@/ → src/)
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── setupTests.js                    # Imports jest-dom matchers for all tests
└── vite.config.js                   # Build config, proxy, base path, test env
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

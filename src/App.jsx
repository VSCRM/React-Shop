import { Routes, Route } from 'react-router';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/order/OrdersPage';
import { TrackingPage } from './pages/tracking/TrackingPage';

function App() {
	return (
		<Routes>
			<Route index element={<HomePage />} />
			<Route path="checkout" element={<CheckoutPage />} />
			<Route path="orders" element={<OrdersPage />} />
			<Route path="tracking/:orderId/:productId" element={<TrackingPage />} />
			<Route path="tracking/:orderId" element={<TrackingPage />} />
		</Routes>
	);
}

export default App;

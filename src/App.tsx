import { Routes, Route } from 'react-router';
import { HomePage } from '@/pages/home/HomePage';
import { CheckoutPage } from '@/pages/checkout/CheckoutPage';
import { OrdersPage } from '@/pages/order/OrdersPage';
import { TrackingPage } from '@/pages/tracking/TrackingPage';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function App() {
	return (
		<Routes>
			<Route index element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
			<Route path="checkout" element={<ErrorBoundary><CheckoutPage /></ErrorBoundary>} />
			<Route path="orders" element={<ErrorBoundary><OrdersPage /></ErrorBoundary>} />
			<Route path="tracking/:orderId/:productId" element={<ErrorBoundary><TrackingPage /></ErrorBoundary>} />
			<Route path="tracking/:orderId" element={<ErrorBoundary><TrackingPage /></ErrorBoundary>} />
		</Routes>
	);
}

export default App;

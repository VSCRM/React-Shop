import { Routes, Route } from 'react-router';
import { useCartContext } from './hooks/useCartContext';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/order/OrdersPage';
import './App.css'

function App() {
	const { cart, updateDeliveryOption, removeItem, updateQuantity, placeOrder, addCart } = useCartContext();

	return (
		<Routes>
			<Route index element={<HomePage cart={cart} />} />
			<Route
				path="checkout"
				element={<CheckoutPage
					cart={cart}
					updateDeliveryOption={updateDeliveryOption}
					removeItem={removeItem}
					updateQuantity={updateQuantity}
					placeOrder={placeOrder}
				/>}
			/>
			<Route path="orders" element={<OrdersPage cart={cart} addCart={addCart} />} />
		</Routes>
	)
}

export default App

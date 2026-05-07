import { Header } from '@/layout/Header';
import { OrderContainer } from './OrderContainer';
import { useOrders } from '@/hooks/useOrders';
import { useCartContext } from '@/hooks/useCartContext';
import './OrdersPage.css';

export function OrdersPage() {
	const { addCart } = useCartContext();
	const { orders, loading, error } = useOrders();

	return (
		<>
			<title>Orders</title>

			<Header />

			<div className="orders-page">
				<div className="page-title">Your Orders</div>

				{error && <p className="error-message">{error}</p>}
				{loading && <p className="loading-message">Loading orders…</p>}

				<div className="orders-grid">
					{orders.map((singleOrder) => (
						<OrderContainer
							key={singleOrder.id}
							singleOrder={singleOrder}
							addCart={addCart}
						/>
					))}
				</div>
			</div>
		</>
	);
}

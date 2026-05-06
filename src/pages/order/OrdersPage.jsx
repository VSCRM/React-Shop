import { Header } from '../../layout/Header';
import { OrderContainer } from './OrderContainer';
import { useOrders } from '../../hooks/useOrders';
import { useCartContext } from '../../hooks/useCartContext';
import './OrdersPage.css';

export function OrdersPage() {
	const { addCart } = useCartContext();
	const orders = useOrders();

	return (
		<>
			<title>Orders</title>

			<Header />

			<div className="orders-page">
				<div className="page-title">Your Orders</div>

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

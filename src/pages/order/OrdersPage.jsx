import { Header } from '../../components/Header';
import { OrderContainer } from './OrderContainer';
import { useOrders } from '../../hooks/useOrders';
import './OrdersPage.css';

export function OrdersPage({ cart, addCart }) {
	const orders = useOrders();

	return (
		<>
			<title>Orders</title>

			<Header cart={cart} />

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

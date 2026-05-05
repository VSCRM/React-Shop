import { useParams, Link } from 'react-router';
import { getTrackedProducts } from '../../utils/getTrackedProducts';
import { Header } from '../../components/Header';
import { TrackingItem } from './TrackingItem';
import { TrackingStatusMessage } from './TrackingStatusMessage';
import { useOrder } from '../../hooks/useOrder';
import './TrackingPage.css';

export function TrackingPage({ cart }) {
	const { orderId, productId } = useParams();
	const { order, loading, error } = useOrder(orderId);

	const trackedProducts = getTrackedProducts(order, productId);

	const isEmpty = !loading && !error && trackedProducts.length === 0;

	return (
		<>
			<title>Track Package</title>

			<Header cart={cart} />

			<div className="tracking-page">
				<Link to="/orders" className="back-to-orders-link link-primary">
					← View all orders
				</Link>

				<TrackingStatusMessage loading={loading} error={error} isEmpty={isEmpty} />

				{trackedProducts.map((orderProduct) => (
					<TrackingItem
						key={orderProduct.productId}
						orderProduct={orderProduct}
						orderTimeMs={order.orderTimeMs}
					/>
				))}
			</div>
		</>
	);
}

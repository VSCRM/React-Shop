import { TrackingDeliveryHeader } from './TrackingDeliveryHeader';
import { TrackingProductInfo } from './TrackingProductInfo';
import { TrackingProgress } from './TrackingProgress';
import { computeStatus } from '../../utils/computeStatus';

export function TrackingItem({ orderProduct, orderTimeMs }) {
	const { product, quantity, estimatedDeliveryTimeMs } = orderProduct;
	const status = computeStatus(orderTimeMs, estimatedDeliveryTimeMs);

	return (
		<div className="order-tracking">
			<TrackingDeliveryHeader
				estimatedDeliveryTimeMs={estimatedDeliveryTimeMs}
				status={status}
			/>

			<TrackingProductInfo product={product} quantity={quantity} />

			<TrackingProgress status={status} />
		</div>
	);
}

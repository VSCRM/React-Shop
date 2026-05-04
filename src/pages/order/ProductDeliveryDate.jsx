import dayjs from "dayjs";

export function ProductDeliveryDate({ estimatedDeliveryTimeMs }) {
	return (
		<div className="product-delivery-date">
			Arriving on: {dayjs(estimatedDeliveryTimeMs).format('MMMM D')}
		</div>
	);
}

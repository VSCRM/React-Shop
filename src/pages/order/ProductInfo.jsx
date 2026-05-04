import dayjs from "dayjs";

export function ProductInfo({ name, deliveryTimeMs, quantity }) {
	return (
		<>
			<div className="product-name">{name}</div>
			<div className="product-delivery-date">
				Arriving on: {dayjs(deliveryTimeMs).format('MMMM D')}
			</div>
			<div className="product-quantity">Quantity: {quantity}</div>
		</>
	);
}

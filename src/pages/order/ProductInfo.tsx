import dayjs from 'dayjs';

interface Props {
	name: string;
	deliveryTimeMs: number;
	quantity: number;
}

export function ProductInfo({ name, deliveryTimeMs, quantity }: Props) {
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

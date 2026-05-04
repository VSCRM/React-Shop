import dayjs from "dayjs";

export function ProductDetails({ orderProduct }) {
	return (
		<div className="product-details">
			<div className="product-name">
				{orderProduct.product.name}
			</div>
			<div className="product-delivery-date">
				Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
			</div>
			<div className="product-quantity">Quantity: {orderProduct.quantity}</div>
			<button className="buy-again-button button-primary">
				<img className="buy-again-icon" src="images/icons/buy-again.png" />
				<span className="buy-again-message">Add to Cart</span>
			</button>
		</div>
	);
}

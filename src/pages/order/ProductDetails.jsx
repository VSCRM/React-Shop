import { useState } from "react";
import { ProductInfo } from "./ProductInfo";
import { BuyAgainPicker } from "./BuyAgainPicker";

export function ProductDetails({ orderProduct, addCart }) {
	const [showPicker, setShowPicker] = useState(false);
	const [selectedQuantity, setSelectedQuantity] = useState(1);
	const [added, setAdded] = useState(false);

	const flashAdded = () => {
		setAdded(true);
		setTimeout(() => setAdded(false), 2000);
	};

	const handleAddToCart = () => {
		if (orderProduct.quantity === 1) {
			addCart(orderProduct.productId, 1);
			flashAdded();
		} else {
			setShowPicker(true);
		}
	};

	const handleConfirm = () => {
		addCart(orderProduct.productId, selectedQuantity);
		setShowPicker(false);
		setSelectedQuantity(1);
		flashAdded();
	};

	return (
		<div className="product-details">
			<ProductInfo
				name={orderProduct.product.name}
				deliveryTimeMs={orderProduct.estimatedDeliveryTimeMs}
				quantity={orderProduct.quantity}
			/>

			{!showPicker ? (
				<button className="buy-again-button button-primary" onClick={handleAddToCart}>
					<img className="buy-again-icon" src="images/icons/buy-again.png" alt="buy" />
					<span className="buy-again-message">
						{added ? 'Added!' : 'Add to Cart'}
					</span>
				</button>
			) : (
				<BuyAgainPicker
					maxQuantity={orderProduct.quantity}
					selectedQuantity={selectedQuantity}
					onSelect={setSelectedQuantity}
					onConfirm={handleConfirm}
					onCancel={() => setShowPicker(false)}
				/>
			)}
		</div>
	);
}

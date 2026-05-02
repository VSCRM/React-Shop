import { useState } from "react";
import { formatMoney } from "../../utils/money";
import { useAddToCartAnimation } from "../../hooks/useAddToCartAnimation";
import { ProductRating } from "./ProductRating";
import { ProductQuantity } from "./ProductQuantity";
import { AddedMessage } from "./AddedMessage";

export function ProductCard({ product, addCart }) {
	const [selectedQuantity, setSelectedQuantity] = useState(1);
	const { isAdded, triggerAnimation } = useAddToCartAnimation();

	const handleAddToCart = () => {
		addCart(product.id, selectedQuantity);
		triggerAnimation();
	};

	return (
		<div className="product-container">
			<div className="product-image-container">
				<img className="product-image" src={product.image} />
			</div>

			<div className="product-name limit-text-to-2-lines">
				{product.name}
			</div>

			<ProductRating rating={product.rating} />

			<div className="product-price">
				{formatMoney(product.priceCents)}
			</div>

			<ProductQuantity
				selectedQuantity={selectedQuantity}
				setSelectedQuantity={setSelectedQuantity}
			/>

			<AddedMessage isAdded={isAdded} quantity={selectedQuantity} />

			<div className="product-spacer"></div>

			<button className="add-to-cart-button button-primary"
				onClick={() => {
					handleAddToCart()
				}}>
				Add to Cart
			</button>
		</div>
	);
}

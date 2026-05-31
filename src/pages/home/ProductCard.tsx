import { useState } from "react";
import type { Product } from "@/types";
import { apiImage } from "@/utils/imageUrl";
import { formatMoney } from "@/utils/money";
import { ProductRating } from "./ProductRating";
import { ProductQuantity } from "./ProductQuantity";
import { AddedMessage } from "./AddedMessage";
import { useFlashMessage } from "@/hooks/useFlashMessage";

interface Props {
	product: Product;
	addCart: (productId: string, quantity: number) => Promise<void>;
}

export function ProductCard({ product, addCart }: Props) {
	const [selectedQuantity, setSelectedQuantity] = useState(1);
	const [isAdded, triggerAdded] = useFlashMessage(2000);

	const handleAddToCart = () => {
		addCart(product.id, selectedQuantity);
		triggerAdded();
	};

	return (
		<div className="product-container">
			<div className="product-image-container">
				<img
					className="product-image"
					src={apiImage(product.image)}
					alt={product.name}
				/>
			</div>

			<div className="product-name limit-text-to-2-lines">{product.name}</div>

			<ProductRating rating={product.rating} />

			<div className="product-price">{formatMoney(product.priceCents)}</div>

			<ProductQuantity
				selectedQuantity={selectedQuantity}
				setSelectedQuantity={setSelectedQuantity}
			/>

			<AddedMessage isAdded={isAdded} quantity={selectedQuantity} />

			<div className="product-spacer"></div>

			<button
				className="add-to-cart-button button-primary"
				onClick={handleAddToCart}
			>
				Add to Cart
			</button>
		</div>
	);
}

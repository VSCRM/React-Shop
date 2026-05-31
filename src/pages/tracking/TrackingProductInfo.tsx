import type { Product } from "@/types";
import { apiImage } from "@/utils/imageUrl";

interface Props {
	product: Product;
	quantity: number;
}

export function TrackingProductInfo({ product, quantity }: Props) {
	return (
		<>
			<div className="product-info">{product.name}</div>
			<div className="product-info">Quantity: {quantity}</div>
			<img
				className="product-image"
				src={apiImage(product.image)}
				alt={product.name}
			/>
		</>
	);
}

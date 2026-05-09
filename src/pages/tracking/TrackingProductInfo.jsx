import { apiImage } from '@/utils/imageUrl';

export function TrackingProductInfo({ product, quantity }) {
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

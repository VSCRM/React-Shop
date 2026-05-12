import type { OrderProduct } from '@/types';
import { staticImage } from '@/utils/imageUrl';
import { ProductInfo } from './ProductInfo';
import { BuyAgainPicker } from './BuyAgainPicker';
import { useFlashMessage } from '@/hooks/useFlashMessage';
import { useBuyAgain } from '@/hooks/useBuyAgain';

interface Props {
	orderProduct: OrderProduct;
	addCart: (productId: string, quantity: number) => Promise<void>;
}

export function ProductDetails({ orderProduct, addCart }: Props) {
	const [added, flashAdded] = useFlashMessage(2000);
	const { showPicker, selectedQuantity, setSelectedQuantity, handleAddToCart, handleConfirm, handleCancel } =
		useBuyAgain(orderProduct, addCart, flashAdded);

	return (
		<div className="product-details">
			<ProductInfo
				name={orderProduct.product.name}
				deliveryTimeMs={orderProduct.estimatedDeliveryTimeMs}
				quantity={orderProduct.quantity}
			/>

			{!showPicker ? (
				<button className="buy-again-button button-primary" onClick={handleAddToCart}>
					<img className="buy-again-icon" src={staticImage('images/icons/buy-again.png')} alt="buy" />
					<span className="buy-again-message">{added ? 'Added!' : 'Add to Cart'}</span>
				</button>
			) : (
				<BuyAgainPicker
					maxQuantity={orderProduct.quantity}
					selectedQuantity={selectedQuantity}
					onSelect={setSelectedQuantity}
					onConfirm={handleConfirm}
					onCancel={handleCancel}
				/>
			)}
		</div>
	);
}

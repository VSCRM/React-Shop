import { ProductInfo } from "./ProductInfo";
import { BuyAgainPicker } from "./BuyAgainPicker";
import { useFlashMessage } from "../../hooks/useFlashMessage";
import { useBuyAgain } from "../../hooks/useBuyAgain";

export function ProductDetails({ orderProduct, addCart }) {
	const [added, flashAdded] = useFlashMessage(2000);

	const {
		showPicker,
		selectedQuantity,
		setSelectedQuantity,
		handleAddToCart,
		handleConfirm,
		handleCancel
	} = useBuyAgain(orderProduct, addCart, flashAdded);

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
					onCancel={handleCancel}
				/>
			)}
		</div>
	);
}

import { apiImage } from '@/utils/imageUrl';
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemActions } from "./CartItemActions";
import { useCartItemHandlers } from "../../hooks/useCartItemHandlers";

export function CartItemDetails({ cartItem, deliveryOptions, updateDeliveryOption, removeItem, updateQuantity }) {
	const handlers = useCartItemHandlers(cartItem, updateQuantity, removeItem);

	return (
		<div className="cart-item-details-grid">
			<img className="product-image" src={apiImage(cartItem.product.image)} alt={cartItem.product.name} />

			<div className="cart-item-details">
				<div className="product-name">{cartItem.product.name}</div>
				<div className="product-price">{formatMoney(cartItem.product.priceCents)}</div>

				<div className="product-quantity">
					<CartItemActions cartItem={cartItem} handlers={handlers} />
				</div>
			</div>

			<DeliveryOptions
				deliveryOptions={deliveryOptions}
				cartItem={cartItem}
				updateDeliveryOption={updateDeliveryOption}
			/>
		</div>
	);
}

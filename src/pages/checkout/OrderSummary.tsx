import type { CartItem, DeliveryOption } from '@/types';
import { DeliveryDate } from './DeliveryDate';
import { CartItemDetails } from './CartItemDetails';

interface Props {
	cart: CartItem[];
	deliveryOptions: DeliveryOption[];
	updateDeliveryOption: (productId: string, deliveryOptionId: string) => Promise<void>;
	removeItem: (productId: string) => Promise<void>;
	updateQuantity: (productId: string, quantity: number) => Promise<void>;
}

export function OrderSummary({ cart, deliveryOptions, updateDeliveryOption, removeItem, updateQuantity }: Props) {
	return (
		<div className="order-summary">
			{deliveryOptions.length > 0 && cart.map((cartItem) => {
				const selectedDeliveryOption = deliveryOptions.find((o) => o.id === cartItem.deliveryOptionId);

				return (
					<div key={cartItem.productId} className="cart-item-container">
						{selectedDeliveryOption && <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />}
						<CartItemDetails
							cartItem={cartItem}
							deliveryOptions={deliveryOptions}
							updateDeliveryOption={updateDeliveryOption}
							removeItem={removeItem}
							updateQuantity={updateQuantity}
						/>
					</div>
				);
			})}
		</div>
	);
}

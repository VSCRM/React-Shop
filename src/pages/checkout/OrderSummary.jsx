import { DeliveryDate } from "./DeliveryDate";
import { CartItemDetails } from "./CartItemDetails";

export function OrderSummary({ cart, deliveryOptions, updateDeliveryOption }) {
	return (
		<div className="order-summary">
			{deliveryOptions.length > 0 && cart.map((cartItem) => {
				const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
					return deliveryOption.id === cartItem.deliveryOptionId;
				});

				return (
					<div key={cartItem.productId} className="cart-item-container">
						<DeliveryDate selectedDeliveryOption={selectedDeliveryOption}/>

						<CartItemDetails
							cartItem={cartItem}
							deliveryOptions={deliveryOptions}
							updateDeliveryOption={updateDeliveryOption}
						/>
					</div>
				);
			})}
		</div>
	);
}

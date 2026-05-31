import dayjs from "dayjs";
import type { CartItem, DeliveryOption } from "@/types";
import { formatMoney } from "@/utils/money";

interface Props {
	deliveryOptions: DeliveryOption[];
	cartItem: CartItem;
	updateDeliveryOption: (
		productId: string,
		deliveryOptionId: string,
	) => Promise<void>;
}

export function DeliveryOptions({
	deliveryOptions,
	cartItem,
	updateDeliveryOption,
}: Props) {
	return (
		<div className="delivery-options">
			<div className="delivery-options-title">Choose a delivery option:</div>
			{deliveryOptions.map((option) => {
				const priceString =
					option.priceCents > 0
						? `${formatMoney(option.priceCents)} - Shipping`
						: "FREE Shipping";

				return (
					<label key={option.id} className="delivery-option">
						<input
							type="radio"
							checked={option.id === cartItem.deliveryOptionId}
							className="delivery-option-input"
							name={`delivery-option-${cartItem.productId}`}
							onChange={() =>
								updateDeliveryOption(cartItem.productId, option.id)
							}
						/>
						<div>
							<div className="delivery-option-date">
								{dayjs(option.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
							</div>
							<div className="delivery-option-price">{priceString}</div>
						</div>
					</label>
				);
			})}
		</div>
	);
}

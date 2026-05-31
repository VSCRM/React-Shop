import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import { useDeliveryOptions } from "@/hooks/useDeliveryOptions";
import { usePaymentSummary } from "@/hooks/usePaymentSummary";
import { useCartContext } from "@/hooks/useCartContext";
import "./CheckoutHeader.css";
import "./CheckoutPage.css";

export function CheckoutPage() {
	const { cart, updateDeliveryOption, removeItem, updateQuantity, placeOrder } =
		useCartContext();
	const { deliveryOptions, error: deliveryError } = useDeliveryOptions();
	const { paymentSummary, error: paymentError } = usePaymentSummary({ cart });

	return (
		<>
			<title>Checkout</title>

			<CheckoutHeader cart={cart} />

			<div className="checkout-page">
				<div className="page-title">Review your order</div>

				{deliveryError && <p className="error-message">{deliveryError}</p>}
				{paymentError && <p className="error-message">{paymentError}</p>}

				<div className="checkout-grid">
					<OrderSummary
						cart={cart}
						deliveryOptions={deliveryOptions}
						updateDeliveryOption={updateDeliveryOption}
						removeItem={removeItem}
						updateQuantity={updateQuantity}
					/>
					<PaymentSummary
						paymentSummary={paymentSummary}
						placeOrder={placeOrder}
						cart={cart}
					/>
				</div>
			</div>
		</>
	);
}

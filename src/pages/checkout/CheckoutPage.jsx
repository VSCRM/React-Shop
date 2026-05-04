import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import { useDeliveryOptions } from '../../hooks/useDeliveryOptions';
import { usePaymentSummary } from '../../hooks/usePaymentSummary';
import './checkout-header.css'
import './CheckoutPage.css'

export function CheckoutPage({ cart, updateDeliveryOption, removeItem, updateQuantity, placeOrder }) {
	const deliveryOptions = useDeliveryOptions();
	const paymentSummary = usePaymentSummary({ cart });

	return (
		<>
			<title>Checkout</title>

			<CheckoutHeader cart={cart} />

			<div className="checkout-page">
				<div className="page-title">Review your order</div>

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

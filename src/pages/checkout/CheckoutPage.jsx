import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import { useDeliveryOptions } from '../../hooks/useDeliveryOptions';
import { usePaymentSummary } from '../../hooks/usePaymentSummary';
import './checkout-header.css'
import './CheckoutPage.css'

export function CheckoutPage({ cart, updateDeliveryOption }) {
	const deliveryOptions = useDeliveryOptions();
	const paymentSummary = usePaymentSummary({ cart });

	return (
		<>
			<title>Checkout</title>

			<CheckoutHeader />

			<div className="checkout-page">
				<div className="page-title">Review your order</div>

				<div className="checkout-grid">
					<OrderSummary
						cart={cart}
						deliveryOptions={deliveryOptions}
						updateDeliveryOption={updateDeliveryOption}
					/>
					<PaymentSummary paymentSummary={paymentSummary} />
				</div>
			</div>
		</>
	);
}

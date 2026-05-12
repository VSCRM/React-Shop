import { Link } from 'react-router';
import type { CartItem } from '@/types';
import { staticImage } from '@/utils/imageUrl';

interface Props {
	cart: CartItem[];
}

export function CheckoutHeader({ cart }: Props) {
	const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

	return (
		<div className="checkout-header">
			<div className="header-content">
				<div className="checkout-header-left-section">
					<Link to="/">
						<img className="logo" src={staticImage('images/logo.png')} alt="logo" />
						<img className="mobile-logo" src={staticImage('images/mobile-logo.png')} alt="logo" />
					</Link>
				</div>

				<div className="checkout-header-middle-section">
					Checkout (<Link className="return-to-home-link" to="/">
						{cartQuantity} {cartQuantity === 1 ? 'item' : 'items'}
					</Link>)
				</div>

				<div className="checkout-header-right-section">
					<img src={staticImage('images/icons/checkout-lock-icon.png')} alt="secure" />
				</div>
			</div>
		</div>
	);
}

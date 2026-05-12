import { Link } from 'react-router';
import type { CartItem } from '@/types';
import { staticImage } from '@/utils/imageUrl';

interface Props {
	cart: CartItem[];
}

export function HeaderNav({ cart }: Props) {
	const totalQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);

	return (
		<div className="right-section">
			<Link className="orders-link header-link" to="/orders">
				<span className="orders-text">Orders</span>
			</Link>

			<Link className="cart-link header-link" to="/checkout">
				<img className="cart-icon" src={staticImage('images/icons/cart-icon.png')} alt="cart" />
				<div className="cart-quantity">{totalQuantity}</div>
				<div className="cart-text">Cart</div>
			</Link>
		</div>
	);
}

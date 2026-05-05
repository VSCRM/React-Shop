import { Link } from 'react-router';

export function HeaderNav({ cart }) {
	const totalQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);

	return (
		<div className="right-section">
			<Link className="orders-link header-link" to="/orders">
				<span className="orders-text">Orders</span>
			</Link>

			<Link className="cart-link header-link" to="/checkout">
				<img className="cart-icon" src="images/icons/cart-icon.png" />
				<div className="cart-quantity">{totalQuantity}</div>
				<div className="cart-text">Cart</div>
			</Link>
		</div>
	);
}

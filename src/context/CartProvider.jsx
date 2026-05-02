import { CartContext } from "./CartContext";
import { useCart } from "../hooks/useCart";

export function CartProvider({ children }) {
	const cartData = useCart();

	return (
		<CartContext.Provider value={cartData}>
			{children}
		</CartContext.Provider>
	);
}

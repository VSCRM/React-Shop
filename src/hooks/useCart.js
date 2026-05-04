import { useCartData } from "./useCartData";
import { useCartActions } from "./useCartActions";

export function useCart() {
	const { cart, setCart, loadCart } = useCartData();
	const { addCart, updateDeliveryOption, updateQuantity, removeItem, placeOrder } = useCartActions(setCart, loadCart);

	return {
		cart, loadCart, addCart, updateDeliveryOption, updateQuantity, removeItem, placeOrder
	};
}

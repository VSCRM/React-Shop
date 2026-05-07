import { useCartData } from '@/hooks/useCartData';
import { useCartActions } from '@/hooks/useCartActions';

export function useCart() {
	const { cart, setCart, loadCart, cartError } = useCartData();
	const { addCart, updateDeliveryOption, updateQuantity, removeItem, placeOrder } = useCartActions(setCart, loadCart);

	return {
		cart, cartError, loadCart, addCart, updateDeliveryOption, updateQuantity, removeItem, placeOrder
	};
}

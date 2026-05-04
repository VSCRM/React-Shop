import axios from "axios";
import { addToCart } from "../services/addToCart";

export function useCartActions(setCart, loadCart) {
	const addCart = async (productId, quantity) => {
		await addToCart(productId, quantity);
		await loadCart();
	};

	const updateDeliveryOption = async (productId, deliveryOptionId) => {
		setCart((prevCart) => {
			return prevCart.map((cartItem) => {
				if (cartItem.productId === productId) {
					return { ...cartItem, deliveryOptionId };
				}
				return cartItem;
			});
		});

		await axios.put(`/api/cart-items/${productId}`, {
			deliveryOptionId
		});

		await loadCart();
	};

	return {
		addCart, updateDeliveryOption
	};
}

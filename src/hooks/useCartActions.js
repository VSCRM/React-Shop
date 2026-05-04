import axios from "axios";
import { addToCart } from "../services/addToCart";
import { updateCartQuantity } from "../services/updateCartQuantity";
import { deleteCartItem } from "../services/deleteCartItem";

export function useCartActions(setCart, loadCart) {
	const addCart = async (productId, quantity) => {
		await addToCart(productId, quantity);
		await loadCart();
	};

	const updateDeliveryOption = async (productId, deliveryOptionId) => {
		await axios.put(`/api/cart-items/${productId}`, {
			deliveryOptionId
		});

		await loadCart();
	};

	const updateQuantity = async (productId, quantity) => {
		await updateCartQuantity(productId, quantity);
		await loadCart();
	};

	const removeItem = async (productId) => {
		await deleteCartItem({ cartItem: { productId } });
		await loadCart();
	};

	return {
		addCart, updateDeliveryOption, updateQuantity, removeItem
	};
}

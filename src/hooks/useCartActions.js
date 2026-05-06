import { useNavigate } from "react-router";
import { addToCart } from "../services/addToCart";
import { updateCartQuantity } from "../services/updateCartQuantity";
import { updateCartDelivery } from "../services/updateCartDelivery";
import { deleteCartItem } from "../services/deleteCartItem";
import { createOrder } from "../services/createOrder";

export function useCartActions(setCart, loadCart) {
	const addCart = async (productId, quantity) => {
		await addToCart(productId, quantity);
		await loadCart();
	};

	const updateDeliveryOption = async (productId, deliveryOptionId) => {
		await updateCartDelivery(productId, deliveryOptionId);
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

	const navigate = useNavigate();

	const placeOrder = async () => {
		await createOrder();
		await loadCart();
		navigate('/orders');
	};

	return {
		addCart, updateDeliveryOption, updateQuantity, removeItem, placeOrder
	};
}

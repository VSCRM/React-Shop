import { useNavigate } from 'react-router';
import { addToCart } from '@/services/addToCart';
import { updateCartQuantity } from '@/services/updateCartQuantity';
import { updateCartDelivery } from '@/services/updateCartDelivery';
import { deleteCartItem } from '@/services/deleteCartItem';
import { createOrder } from '@/services/createOrder';

export function useCartActions(setCart, loadCart) {
	const navigate = useNavigate();

	const addCart = async (productId, quantity) => {
		try {
			await addToCart(productId, quantity);
			await loadCart();
		} catch {
			console.error('Failed to add item to cart');
		}
	};

	const updateDeliveryOption = async (productId, deliveryOptionId) => {
		try {
			await updateCartDelivery(productId, deliveryOptionId);
			await loadCart();
		} catch {
			console.error('Failed to update delivery option');
		}
	};

	const updateQuantity = async (productId, quantity) => {
		try {
			await updateCartQuantity(productId, quantity);
			await loadCart();
		} catch {
			console.error('Failed to update quantity');
		}
	};

	const removeItem = async (productId) => {
		try {
			await deleteCartItem({ cartItem: { productId } });
			await loadCart();
		} catch {
			console.error('Failed to remove item');
		}
	};

	const placeOrder = async () => {
		try {
			await createOrder();
			await loadCart();
			navigate('/orders');
		} catch {
			console.error('Failed to place order');
		}
	};

	return {
		addCart, updateDeliveryOption, updateQuantity, removeItem, placeOrder
	};
}

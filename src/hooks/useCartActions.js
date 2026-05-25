import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { addToCart } from '@/services/addToCart';
import { updateCartQuantity } from '@/services/updateCartQuantity';
import { updateCartDelivery } from '@/services/updateCartDelivery';
import { deleteCartItem } from '@/services/deleteCartItem';
import { createOrder } from '@/services/createOrder';

export function useCartActions(setCart, loadCart) {
	const navigate = useNavigate();

	const addCart = useCallback(async (productId, quantity) => {
		try {
			await addToCart(productId, quantity);
			await loadCart();
		} catch (err) {
			console.error('Failed to add item to cart', err);
		}
	}, [loadCart]);

	const updateDeliveryOption = useCallback(async (productId, deliveryOptionId) => {
		try {
			await updateCartDelivery(productId, deliveryOptionId);
			await loadCart();
		} catch (err) {
			console.error('Failed to update delivery option', err);
		}
	}, [loadCart]);

	const updateQuantity = useCallback(async (productId, quantity) => {
		try {
			await updateCartQuantity(productId, quantity);
			await loadCart();
		} catch (err) {
			console.error('Failed to update quantity', err);
		}
	}, [loadCart]);

	const removeItem = useCallback(async (productId) => {
		try {
			await deleteCartItem({ cartItem: { productId } });
			await loadCart();
		} catch (err) {
			console.error('Failed to remove item', err);
		}
	}, [loadCart]);

	const placeOrder = useCallback(async () => {
		try {
			await createOrder();
			await loadCart();
			navigate('/orders');
		} catch (err) {
			console.error('Failed to place order', err);
		}
	}, [loadCart, navigate]);

	return {
		addCart, updateDeliveryOption, updateQuantity, removeItem, placeOrder
	};
}

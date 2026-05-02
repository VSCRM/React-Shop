import { useState, useEffect } from "react";
import { loadToCart } from "../services/loadToCart";
import { addToCart } from "../services/addToCart";

export function useCart() {
	const [cart, setCart] = useState([]);

	const loadCart = async () => {
		const data = await loadToCart();
		setCart(data);
	};

	useEffect(() => {
		const init = async () => {
			await loadCart();
		};
		init();
	}, []);

	const addCart = async (productId, quantity) => {
		await addToCart(productId, quantity);
		await loadCart();
	};

	const updateDeliveryOption = (productId, deliveryOptionId) => {
		setCart((prevCart) => {
			return prevCart.map((cartItem) => {
				if (cartItem.productId === productId) {
					return { ...cartItem, deliveryOptionId };
				}
				return cartItem;
			});
		});
	};

	return {
		cart, loadCart, updateDeliveryOption, addCart
	};
}

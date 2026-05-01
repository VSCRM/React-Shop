import axios from "axios";
import { useState, useEffect } from "react";

export function useCart() {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		axios.get('/api/cart-items?expand=product')
			.then((response) => {
				setCart(response.data);
			});
	}, []);

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
		cart, updateDeliveryOption
	};
}

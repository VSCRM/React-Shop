import { useState, useEffect } from "react";
import { loadToCart } from "../services/loadToCart";

export function useCartData() {
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

	return {
		cart, setCart, loadCart
	};
}

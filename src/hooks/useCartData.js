import { useState, useEffect, useCallback } from 'react';
import { loadToCart } from '@/services/loadToCart';

export function useCartData() {
	const [cart, setCart] = useState([]);
	const [cartError, setCartError] = useState(null);

	const loadCart = useCallback(async () => {
		try {
			setCartError(null);
			const data = await loadToCart();
			setCart(data);
		} catch {
			setCartError('Could not load cart. Please refresh the page.');
		}
	}, []);

	useEffect(() => {
		let cancelled = false;

		const init = async () => {
			try {
				setCartError(null);
				const data = await loadToCart();
				if (!cancelled) setCart(data);
			} catch {
				if (!cancelled) setCartError('Could not load cart. Please refresh the page.');
			}
		};

		init();
		return () => { cancelled = true; };
	}, []);

	return {
		cart, setCart, loadCart, cartError
	};
}

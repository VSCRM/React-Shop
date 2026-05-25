import { useState, useEffect, useCallback } from 'react';
import { loadToCart } from '@/services/loadToCart';

export function useCartData() {
	const [cart, setCart] = useState([]);
	const [cartError, setCartError] = useState(null);

	// Exposed for manual refetch after mutations.
	// Note: does not guard against unmount — callers (useCartActions)
	// are always mounted for the lifetime of CartProvider, so this is safe.
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
		const controller = new AbortController();
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
		return () => {
			cancelled = true;
			controller.abort();
		};
	}, []);

	return {
		cart, setCart, loadCart, cartError
	};
}

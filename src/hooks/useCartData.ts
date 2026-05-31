/**
 * Manages the raw cart state: loading, persisting, and exposing setter.
 *
 * The actual HTTP calls are delegated to `loadToCart` which already validates
 * the API response with Zod, so no additional schema parsing is needed here.
 */

import { useState, useEffect, useCallback } from "react";
import type { CartItem } from "@/types";
import { loadToCart } from "@/services/loadToCart";

interface UseCartDataResult {
	cart: CartItem[];
	setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
	loadCart: () => Promise<void>;
	cartError: string | null;
}

/** Initialises cart state on mount and exposes a manual reload function. */
export function useCartData(): UseCartDataResult {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [cartError, setCartError] = useState<string | null>(null);

	/** Manual refresh — used after mutating operations (add, delete, etc.). */
	const loadCart = useCallback(async (): Promise<void> => {
		try {
			setCartError(null);
			const data = await loadToCart();
			setCart(data);
		} catch {
			setCartError("Could not load cart. Please refresh the page.");
		}
	}, []);

	/** Auto-load on first render; cleanup flag prevents setState on unmount. */
	useEffect(() => {
		let cancelled = false;

		const init = async (): Promise<void> => {
			try {
				setCartError(null);
				const data = await loadToCart();
				if (!cancelled) setCart(data);
			} catch {
				if (!cancelled)
					setCartError("Could not load cart. Please refresh the page.");
			}
		};

		init();
		return () => {
			cancelled = true;
		};
	}, []);

	return {
		cart,
		setCart,
		loadCart,
		cartError,
	};
}

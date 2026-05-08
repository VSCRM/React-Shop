import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useCartData } from './useCartData';

// ─── Mock the loadToCart service ──────────────────────────────────────────────

vi.mock('@/services/loadToCart', () => ({
	loadToCart: vi.fn(),
}));

import { loadToCart } from '@/services/loadToCart';

const CART_STUB = [
	{ productId: 'p1', quantity: 2, deliveryOptionId: '1' },
	{ productId: 'p2', quantity: 1, deliveryOptionId: '2' },
];

beforeEach(() => vi.clearAllMocks());

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('useCartData', () => {
	describe('initial mount', () => {
		it('starts with an empty cart', () => {
			loadToCart.mockResolvedValue([]);
			const { result } = renderHook(() => useCartData());
			expect(result.current.cart).toEqual([]);
		});

		it('starts with no error', () => {
			loadToCart.mockResolvedValue([]);
			const { result } = renderHook(() => useCartData());
			expect(result.current.cartError).toBeNull();
		});

		it('populates cart after successful fetch', async () => {
			loadToCart.mockResolvedValue(CART_STUB);
			const { result } = renderHook(() => useCartData());
			await waitFor(() => {
				expect(result.current.cart).toEqual(CART_STUB);
			});
		});

		it('sets cartError when loadToCart rejects', async () => {
			loadToCart.mockRejectedValue(new Error('Network error'));
			const { result } = renderHook(() => useCartData());
			await waitFor(() => {
				expect(result.current.cartError).toBe('Could not load cart. Please refresh the page.');
			});
		});
	});

	describe('loadCart (manual refresh)', () => {
		it('refreshes the cart with fresh data', async () => {
			loadToCart
				.mockResolvedValueOnce(CART_STUB)
				.mockResolvedValueOnce([{ productId: 'p3', quantity: 5, deliveryOptionId: '1' }]);

			const { result } = renderHook(() => useCartData());

			await waitFor(() => expect(result.current.cart).toEqual(CART_STUB));

			await act(() => result.current.loadCart());

			expect(result.current.cart).toEqual([{ productId: 'p3', quantity: 5, deliveryOptionId: '1' }]);
		});

		it('clears a previous error on successful reload', async () => {
			loadToCart
				.mockRejectedValueOnce(new Error('fail'))
				.mockResolvedValueOnce(CART_STUB);

			const { result } = renderHook(() => useCartData());

			await waitFor(() => expect(result.current.cartError).not.toBeNull());

			await act(() => result.current.loadCart());

			expect(result.current.cartError).toBeNull();
			expect(result.current.cart).toEqual(CART_STUB);
		});

		it('sets cartError when the reload also fails', async () => {
			loadToCart.mockRejectedValue(new Error('always fails'));
			const { result } = renderHook(() => useCartData());

			await waitFor(() => expect(result.current.cartError).not.toBeNull());

			await act(() => result.current.loadCart());

			expect(result.current.cartError).toBe('Could not load cart. Please refresh the page.');
		});
	});

	describe('setCart (optimistic updates)', () => {
		it('updates cart synchronously via setCart', async () => {
			loadToCart.mockResolvedValue(CART_STUB);
			const { result } = renderHook(() => useCartData());

			await waitFor(() => expect(result.current.cart).toEqual(CART_STUB));

			act(() => result.current.setCart([]));

			expect(result.current.cart).toEqual([]);
		});
	});
});

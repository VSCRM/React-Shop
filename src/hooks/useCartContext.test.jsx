import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCartContext } from './useCartContext';
import { CartContext } from '@/context/CartContext';

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('useCartContext', () => {
	it('returns the context value when used inside a provider', () => {
		const mockValue = {
			cart: [],
			addCart: vi.fn(),
			removeItem: vi.fn(),
		};

		const wrapper = ({ children }) => (
			<CartContext.Provider value={mockValue}>{children}</CartContext.Provider>
		);

		const { result } = renderHook(() => useCartContext(), { wrapper });

		expect(result.current).toBe(mockValue);
	});

	it('returns the exact same reference passed to the provider', () => {
		const mockValue = { cart: [{ productId: 'p1', quantity: 1 }] };

		const wrapper = ({ children }) => (
			<CartContext.Provider value={mockValue}>{children}</CartContext.Provider>
		);

		const { result } = renderHook(() => useCartContext(), { wrapper });

		expect(result.current.cart).toEqual([{ productId: 'p1', quantity: 1 }]);
	});

	it('throws an error when used outside a CartProvider', () => {
		// renderHook with no wrapper → context is undefined
		expect(() => {
			renderHook(() => useCartContext());
		}).toThrow('useCartContext must be used inside <CartProvider>');
	});
});

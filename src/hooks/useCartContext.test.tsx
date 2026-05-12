import { describe, it, expect, vi } from 'vitest';
import type { ReactNode } from 'react';
import type { CartContextValue } from '@/types';
import { renderHook } from '@testing-library/react';
import { useCartContext } from './useCartContext';
import { CartContext } from '@/context/CartContext';

describe('useCartContext', () => {
  it('returns the context value when used inside a provider', () => {
    const mockValue = {
      cart: [],
      cartError: null,
      loadCart: vi.fn(),
      addCart: vi.fn(),
      updateDeliveryOption: vi.fn(),
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
      placeOrder: vi.fn(),
    } as CartContextValue;

    const wrapper = ({ children }: { children: ReactNode }) => (
      <CartContext.Provider value={mockValue}>{children}</CartContext.Provider>
    );

    const { result } = renderHook(() => useCartContext(), { wrapper });

    expect(result.current).toBe(mockValue);
  });

  it('returns the exact same reference passed to the provider', () => {
    const mockValue = {
      cart: [{ productId: 'p1', quantity: 1 } as CartContextValue['cart'][0]],
      cartError: null,
      loadCart: vi.fn(),
      addCart: vi.fn(),
      updateDeliveryOption: vi.fn(),
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
      placeOrder: vi.fn(),
    } as CartContextValue;

    const wrapper = ({ children }: { children: ReactNode }) => (
      <CartContext.Provider value={mockValue}>{children}</CartContext.Provider>
    );

    const { result } = renderHook(() => useCartContext(), { wrapper });

    expect(result.current.cart[0].productId).toBe('p1');
  });

  it('throws an error when used outside a CartProvider', () => {
    expect(() => {
      renderHook(() => useCartContext());
    }).toThrow('useCartContext must be used inside <CartProvider>');
  });
});

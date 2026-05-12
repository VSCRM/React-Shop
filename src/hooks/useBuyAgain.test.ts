import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBuyAgain } from './useBuyAgain';

const makeHook = (
  orderProduct: { productId: string; quantity: number },
  addCart = vi.fn(),
  onAdded = vi.fn()
) => renderHook(() => useBuyAgain(orderProduct, addCart, onAdded));

describe('useBuyAgain', () => {
  describe('initial state', () => {
    it('showPicker is false initially', () => {
      const { result } = makeHook({ productId: 'p1', quantity: 1 });
      expect(result.current.showPicker).toBe(false);
    });

    it('selectedQuantity defaults to 1', () => {
      const { result } = makeHook({ productId: 'p1', quantity: 1 });
      expect(result.current.selectedQuantity).toBe(1);
    });
  });

  describe('handleAddToCart — single quantity product', () => {
    it('calls addCart with productId and quantity 1', () => {
      const addCart = vi.fn();
      const onAdded = vi.fn();
      const { result } = makeHook({ productId: 'p1', quantity: 1 }, addCart, onAdded);

      act(() => result.current.handleAddToCart());

      expect(addCart).toHaveBeenCalledWith('p1', 1);
    });

    it('calls onAdded callback', () => {
      const onAdded = vi.fn();
      const { result } = makeHook({ productId: 'p1', quantity: 1 }, vi.fn(), onAdded);

      act(() => result.current.handleAddToCart());

      expect(onAdded).toHaveBeenCalledTimes(1);
    });

    it('does not open the picker for quantity = 1', () => {
      const { result } = makeHook({ productId: 'p1', quantity: 1 });

      act(() => result.current.handleAddToCart());

      expect(result.current.showPicker).toBe(false);
    });
  });

  describe('handleAddToCart — multi-quantity product', () => {
    it('opens the picker instead of adding directly', () => {
      const addCart = vi.fn();
      const { result } = makeHook({ productId: 'p1', quantity: 3 }, addCart);

      act(() => result.current.handleAddToCart());

      expect(result.current.showPicker).toBe(true);
      expect(addCart).not.toHaveBeenCalled();
    });
  });

  describe('handleConfirm', () => {
    it('calls addCart with productId and selected quantity', () => {
      const addCart = vi.fn();
      const { result } = makeHook({ productId: 'p1', quantity: 3 }, addCart);

      act(() => result.current.handleAddToCart());
      act(() => result.current.setSelectedQuantity(2));
      act(() => result.current.handleConfirm());

      expect(addCart).toHaveBeenCalledWith('p1', 2);
    });

    it('closes the picker after confirming', () => {
      const { result } = makeHook({ productId: 'p1', quantity: 3 });

      act(() => result.current.handleAddToCart());
      act(() => result.current.handleConfirm());

      expect(result.current.showPicker).toBe(false);
    });

    it('resets selectedQuantity to 1 after confirming', () => {
      const { result } = makeHook({ productId: 'p1', quantity: 3 });

      act(() => result.current.handleAddToCart());
      act(() => result.current.setSelectedQuantity(3));
      act(() => result.current.handleConfirm());

      expect(result.current.selectedQuantity).toBe(1);
    });

    it('calls onAdded after confirming', () => {
      const onAdded = vi.fn();
      const { result } = makeHook({ productId: 'p1', quantity: 3 }, vi.fn(), onAdded);

      act(() => result.current.handleAddToCart());
      act(() => result.current.handleConfirm());

      expect(onAdded).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleCancel', () => {
    it('closes the picker without adding to cart', () => {
      const addCart = vi.fn();
      const { result } = makeHook({ productId: 'p1', quantity: 3 }, addCart);

      act(() => result.current.handleAddToCart());
      act(() => result.current.handleCancel());

      expect(result.current.showPicker).toBe(false);
      expect(addCart).not.toHaveBeenCalled();
    });
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCartActions } from './useCartActions';
import { MemoryRouter } from 'react-router';

// ─── Mock all services ────────────────────────────────────────────────────────

vi.mock('@/services/addToCart',         () => ({ addToCart:         vi.fn() }));
vi.mock('@/services/updateCartQuantity',() => ({ updateCartQuantity: vi.fn() }));
vi.mock('@/services/updateCartDelivery',() => ({ updateCartDelivery: vi.fn() }));
vi.mock('@/services/deleteCartItem',    () => ({ deleteCartItem:     vi.fn() }));
vi.mock('@/services/createOrder',       () => ({ createOrder:        vi.fn() }));

import { addToCart }          from '@/services/addToCart';
import { updateCartQuantity } from '@/services/updateCartQuantity';
import { updateCartDelivery } from '@/services/updateCartDelivery';
import { deleteCartItem }     from '@/services/deleteCartItem';
import { createOrder }        from '@/services/createOrder';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const makeHook = (setCart = vi.fn(), loadCart = vi.fn()) => {
	const wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;
	return renderHook(() => useCartActions(setCart, loadCart), { wrapper });
};

beforeEach(() => vi.clearAllMocks());

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('useCartActions', () => {
	describe('addCart', () => {
		it('calls addToCart with productId and quantity', async () => {
			addToCart.mockResolvedValue();
			const loadCart = vi.fn().mockResolvedValue();
			const { result } = makeHook(vi.fn(), loadCart);

			await act(() => result.current.addCart('p1', 3));

			expect(addToCart).toHaveBeenCalledWith('p1', 3);
		});

		it('calls loadCart after adding', async () => {
			addToCart.mockResolvedValue();
			const loadCart = vi.fn().mockResolvedValue();
			const { result } = makeHook(vi.fn(), loadCart);

			await act(() => result.current.addCart('p1', 1));

			expect(loadCart).toHaveBeenCalledTimes(1);
		});

		it('does not throw when addToCart rejects', async () => {
			addToCart.mockRejectedValue(new Error('Network'));
			const { result } = makeHook();

			await expect(act(() => result.current.addCart('p1', 1))).resolves.not.toThrow();
		});
	});

	describe('updateDeliveryOption', () => {
		it('calls updateCartDelivery with productId and deliveryOptionId', async () => {
			updateCartDelivery.mockResolvedValue();
			const loadCart = vi.fn().mockResolvedValue();
			const { result } = makeHook(vi.fn(), loadCart);

			await act(() => result.current.updateDeliveryOption('p1', 'opt-2'));

			expect(updateCartDelivery).toHaveBeenCalledWith('p1', 'opt-2');
			expect(loadCart).toHaveBeenCalledTimes(1);
		});

		it('does not throw on failure', async () => {
			updateCartDelivery.mockRejectedValue(new Error('fail'));
			const { result } = makeHook();

			await expect(act(() => result.current.updateDeliveryOption('p1', 'opt-1'))).resolves.not.toThrow();
		});
	});

	describe('updateQuantity', () => {
		it('calls updateCartQuantity with productId and quantity', async () => {
			updateCartQuantity.mockResolvedValue();
			const loadCart = vi.fn().mockResolvedValue();
			const { result } = makeHook(vi.fn(), loadCart);

			await act(() => result.current.updateQuantity('p2', 4));

			expect(updateCartQuantity).toHaveBeenCalledWith('p2', 4);
			expect(loadCart).toHaveBeenCalledTimes(1);
		});
	});

	describe('removeItem', () => {
		it('calls deleteCartItem with the correct payload', async () => {
			deleteCartItem.mockResolvedValue();
			const loadCart = vi.fn().mockResolvedValue();
			const { result } = makeHook(vi.fn(), loadCart);

			await act(() => result.current.removeItem('p3'));

			expect(deleteCartItem).toHaveBeenCalledWith({ cartItem: { productId: 'p3' } });
			expect(loadCart).toHaveBeenCalledTimes(1);
		});
	});

	describe('placeOrder', () => {
		it('calls createOrder and then loadCart', async () => {
			createOrder.mockResolvedValue({ id: 'order-1' });
			const loadCart = vi.fn().mockResolvedValue();
			const { result } = makeHook(vi.fn(), loadCart);

			await act(() => result.current.placeOrder());

			expect(createOrder).toHaveBeenCalledTimes(1);
			expect(loadCart).toHaveBeenCalledTimes(1);
		});

		it('does not throw when createOrder rejects', async () => {
			createOrder.mockRejectedValue(new Error('fail'));
			const { result } = makeHook();

			await expect(act(() => result.current.placeOrder())).resolves.not.toThrow();
		});
	});
});

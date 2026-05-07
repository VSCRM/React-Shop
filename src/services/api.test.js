import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mock the api module shared by all services ──────────────────────────────
vi.mock('@/services/api', () => ({
	default: {
		get: vi.fn(),
		post: vi.fn(),
		put: vi.fn(),
		delete: vi.fn(),
	},
}));

import api from '@/services/api';
import { addToCart } from './addToCart';
import { loadToCart } from './loadToCart';
import { updateCartQuantity } from './updateCartQuantity';
import { updateCartDelivery } from './updateCartDelivery';
import { deleteCartItem } from './deleteCartItem';
import { createOrder } from './createOrder';

beforeEach(() => vi.clearAllMocks());

// ─── addToCart ────────────────────────────────────────────────────────────────
describe('addToCart', () => {
	it('POSTs to /api/cart-items with productId and quantity', async () => {
		api.post.mockResolvedValue({ data: {} });

		await addToCart('prod-1', 3);

		expect(api.post).toHaveBeenCalledWith('/api/cart-items', {
			productId: 'prod-1',
			quantity: 3,
		});
	});
});

// ─── loadToCart ───────────────────────────────────────────────────────────────
describe('loadToCart', () => {
	it('GETs /api/cart-items with expand=product and returns data', async () => {
		const cartItems = [{ productId: 'p1', quantity: 2 }];
		api.get.mockResolvedValue({ data: cartItems });

		const result = await loadToCart();

		expect(api.get).toHaveBeenCalledWith('/api/cart-items?expand=product');
		expect(result).toEqual(cartItems);
	});
});

// ─── updateCartQuantity ───────────────────────────────────────────────────────
describe('updateCartQuantity', () => {
	it('PUTs to /api/cart-items/:productId with new quantity', async () => {
		api.put.mockResolvedValue({ data: {} });

		await updateCartQuantity('prod-2', 5);

		expect(api.put).toHaveBeenCalledWith('/api/cart-items/prod-2', { quantity: 5 });
	});
});

// ─── updateCartDelivery ───────────────────────────────────────────────────────
describe('updateCartDelivery', () => {
	it('PUTs to /api/cart-items/:productId with deliveryOptionId', async () => {
		api.put.mockResolvedValue({ data: {} });

		await updateCartDelivery('prod-3', 'delivery-opt-1');

		expect(api.put).toHaveBeenCalledWith('/api/cart-items/prod-3', {
			deliveryOptionId: 'delivery-opt-1',
		});
	});
});

// ─── deleteCartItem ───────────────────────────────────────────────────────────
describe('deleteCartItem', () => {
	it('DELETEs /api/cart-items/:productId', async () => {
		api.delete.mockResolvedValue({ data: {} });

		await deleteCartItem({ cartItem: { productId: 'prod-4' } });

		expect(api.delete).toHaveBeenCalledWith('/api/cart-items/prod-4');
	});
});

// ─── createOrder ─────────────────────────────────────────────────────────────
describe('createOrder', () => {
	it('POSTs to /api/orders and returns response data', async () => {
		const orderData = { id: 'order-99' };
		api.post.mockResolvedValue({ data: orderData });

		const result = await createOrder();

		expect(api.post).toHaveBeenCalledWith('/api/orders');
		expect(result).toEqual(orderData);
	});
});

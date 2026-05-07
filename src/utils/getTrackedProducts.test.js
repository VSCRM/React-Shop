import { describe, it, expect } from 'vitest';
import { getTrackedProducts } from './getTrackedProducts';

const mockOrder = {
	id: 'order-1',
	products: [
		{ productId: 'p1', name: 'Shirt' },
		{ productId: 'p2', name: 'Pants' },
		{ productId: 'p1', name: 'Shirt (duplicate)' },
	],
};

describe('getTrackedProducts', () => {
	it('returns an empty array when order is null', () => {
		expect(getTrackedProducts(null, 'p1')).toEqual([]);
	});

	it('returns an empty array when order has no products field', () => {
		expect(getTrackedProducts({}, 'p1')).toEqual([]);
	});

	it('returns all products when no productId is provided', () => {
		const result = getTrackedProducts(mockOrder, undefined);
		expect(result).toHaveLength(3);
	});

	it('filters by productId when provided', () => {
		const result = getTrackedProducts(mockOrder, 'p1');
		expect(result).toHaveLength(2);
		result.forEach((p) => expect(p.productId).toBe('p1'));
	});

	it('returns an empty array when productId does not match any product', () => {
		const result = getTrackedProducts(mockOrder, 'p999');
		expect(result).toEqual([]);
	});

	it('returns the correct single product when productId is unique', () => {
		const result = getTrackedProducts(mockOrder, 'p2');
		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('Pants');
	});
});

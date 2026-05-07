import { describe, it, expect, vi, afterEach } from 'vitest';
import { computeStatus } from './computeStatus';

afterEach(() => {
	vi.restoreAllMocks();
});

describe('computeStatus', () => {
	const freeze = (ms) => vi.spyOn(Date, 'now').mockReturnValue(ms);

	describe('Delivered', () => {
		it('returns "Delivered" when current time equals estimated delivery', () => {
			const orderTime = 1000;
			const deliveryTime = 2000;
			freeze(2000);
			expect(computeStatus(orderTime, deliveryTime)).toBe('Delivered');
		});

		it('returns "Delivered" when current time is past estimated delivery', () => {
			const orderTime = 1000;
			const deliveryTime = 2000;
			freeze(9999);
			expect(computeStatus(orderTime, deliveryTime)).toBe('Delivered');
		});
	});

	describe('Preparing', () => {
		it('returns "Preparing" when less than 40% of duration has elapsed', () => {
			// totalDuration = 10000ms. 39% elapsed → still Preparing
			const orderTime = 0;
			const deliveryTime = 10000;
			freeze(3900); // 39% of total
			expect(computeStatus(orderTime, deliveryTime)).toBe('Preparing');
		});

		it('returns "Preparing" right after the order was placed', () => {
			const orderTime = 0;
			const deliveryTime = 10000;
			freeze(100); // 1% elapsed
			expect(computeStatus(orderTime, deliveryTime)).toBe('Preparing');
		});
	});

	describe('Shipped', () => {
		it('returns "Shipped" when between 40% and 100% of duration has elapsed', () => {
			const orderTime = 0;
			const deliveryTime = 10000;
			freeze(5000); // 50% elapsed
			expect(computeStatus(orderTime, deliveryTime)).toBe('Shipped');
		});

		it('returns "Shipped" at exactly 40% elapsed', () => {
			const orderTime = 0;
			const deliveryTime = 10000;
			freeze(4000); // exactly 40%
			expect(computeStatus(orderTime, deliveryTime)).toBe('Shipped');
		});

		it('returns "Shipped" at 99% elapsed (just before delivery)', () => {
			const orderTime = 0;
			const deliveryTime = 10000;
			freeze(9999);
			expect(computeStatus(orderTime, deliveryTime)).toBe('Shipped');
		});
	});
});

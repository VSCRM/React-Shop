import { describe, it, expect } from 'vitest';
import { formatMoney } from './money';

describe('formatMoney', () => {
	it('formats cents to dollar string with 2 decimals', () => {
		expect(formatMoney(1999)).toBe('$19.99');
	});

	it('formats zero cents as $0.00', () => {
		expect(formatMoney(0)).toBe('$0.00');
	});

	it('formats whole dollars', () => {
		expect(formatMoney(500)).toBe('$5.00');
	});

	it('formats large amounts correctly', () => {
		expect(formatMoney(100000)).toBe('$1000.00');
	});

	it('always shows exactly 2 decimal places', () => {
		expect(formatMoney(100)).toBe('$1.00');
		expect(formatMoney(10)).toBe('$0.10');
		expect(formatMoney(1)).toBe('$0.01');
	});

	it('prefixes result with a dollar sign', () => {
		expect(formatMoney(250)).toMatch(/^\$/);
	});
});

import { describe, it, expect } from 'vitest';
import { buildSearchPath } from './searchUtils';

describe('buildSearchPath', () => {
	it('returns "/" for an empty string', () => {
		expect(buildSearchPath('')).toBe('/');
	});

	it('returns "/" for a whitespace-only string', () => {
		expect(buildSearchPath('   ')).toBe('/');
	});

	it('builds a query path with the correct key', () => {
		expect(buildSearchPath('shoes')).toBe('/?q=shoes');
	});

	it('URL-encodes special characters', () => {
		expect(buildSearchPath('running shoes & boots')).toBe('/?q=running%20shoes%20%26%20boots');
	});

	it('trims leading and trailing whitespace before encoding', () => {
		expect(buildSearchPath('  socks  ')).toBe('/?q=socks');
	});

	it('preserves inner spaces in the encoded value', () => {
		const result = buildSearchPath('red sneakers');
		expect(result).toBe('/?q=red%20sneakers');
	});
});

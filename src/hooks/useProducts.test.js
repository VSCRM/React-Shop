import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useProducts } from './useProducts';

// ─── Mock api ─────────────────────────────────────────────────────────────────

vi.mock('@/services/api', () => ({
	default: { get: vi.fn() },
}));

import api from '@/services/api';

const PRODUCTS_STUB = [
	{ id: 'p1', name: 'Socks',      priceCents: 1090, rating: { stars: 4.5, count: 87 } },
	{ id: 'p2', name: 'Basketball', priceCents: 2095, rating: { stars: 4,   count: 127 } },
];

beforeEach(() => vi.clearAllMocks());

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('useProducts', () => {
	describe('successful fetch', () => {
		it('returns all products when no search query is provided', async () => {
			api.get.mockResolvedValue({ data: PRODUCTS_STUB });
			const { result } = renderHook(() => useProducts(''));

			await waitFor(() => expect(result.current.loading).toBe(false));

			expect(result.current.products).toEqual(PRODUCTS_STUB);
			expect(result.current.error).toBeNull();
		});

		it('calls GET /api/products without params for an empty query', async () => {
			api.get.mockResolvedValue({ data: [] });
			renderHook(() => useProducts(''));

			await waitFor(() => {});

			expect(api.get).toHaveBeenCalledWith('/api/products', { params: {} });
		});

		it('passes the search param when a query is provided', async () => {
			api.get.mockResolvedValue({ data: [] });
			renderHook(() => useProducts('  socks  '));

			await waitFor(() => {});

			expect(api.get).toHaveBeenCalledWith('/api/products', { params: { search: 'socks' } });
		});

		it('re-fetches when the search query changes', async () => {
			api.get.mockResolvedValue({ data: [] });
			const { rerender } = renderHook(({ q }) => useProducts(q), {
				initialProps: { q: '' },
			});

			await waitFor(() => {});

			rerender({ q: 'shoes' });

			await waitFor(() => {
				expect(api.get).toHaveBeenCalledTimes(2);
			});
		});
	});

	describe('loading state', () => {
		it('starts in a loading state', () => {
			api.get.mockResolvedValue({ data: [] });
			const { result } = renderHook(() => useProducts(''));
			expect(result.current.loading).toBe(true);
		});

		it('sets loading to false after a successful fetch', async () => {
			api.get.mockResolvedValue({ data: PRODUCTS_STUB });
			const { result } = renderHook(() => useProducts(''));

			await waitFor(() => expect(result.current.loading).toBe(false));
		});
	});

	describe('error handling', () => {
		it('sets error message when the request fails', async () => {
			api.get.mockRejectedValue(new Error('Network'));
			const { result } = renderHook(() => useProducts(''));

			await waitFor(() => {
				expect(result.current.error).toBe('Could not load products. Please try again.');
			});
		});

		it('sets loading to false even when the request fails', async () => {
			api.get.mockRejectedValue(new Error('Network'));
			const { result } = renderHook(() => useProducts(''));

			await waitFor(() => expect(result.current.loading).toBe(false));
		});

		it('clears error on the next successful fetch', async () => {
			api.get
				.mockRejectedValueOnce(new Error('fail'))
				.mockResolvedValueOnce({ data: PRODUCTS_STUB });

			const { result, rerender } = renderHook(({ q }) => useProducts(q), {
				initialProps: { q: '' },
			});

			await waitFor(() => expect(result.current.error).not.toBeNull());

			rerender({ q: 'shoes' });

			await waitFor(() => {
				expect(result.current.error).toBeNull();
				expect(result.current.products).toEqual(PRODUCTS_STUB);
			});
		});
	});
});

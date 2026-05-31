/**
 * Tests for the `useProducts` hook.
 *
 * Coverage:
 * a) Renders correctly with valid typed data from the API.
 * b) Zod schema rejects malformed API responses — hook surfaces an error message.
 * c) Loading states, query param construction, and re-fetch on query change.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useProducts } from "./useProducts";

vi.mock("@/services/api", () => ({
	default: { get: vi.fn() },
}));

import api from "@/services/api";

/** Fully valid product list — passes ProductListSchema. */
const VALID_PRODUCTS = [
	{
		id: "p1",
		name: "Socks",
		priceCents: 1090,
		image: "img/socks.jpg",
		rating: { stars: 4.5, count: 87 },
	},
	{
		id: "p2",
		name: "Basketball",
		priceCents: 2095,
		image: "img/basketball.jpg",
		rating: { stars: 4, count: 127 },
	},
];

beforeEach(() => vi.clearAllMocks());

describe("useProducts", () => {
	// ── a) Valid data ──────────────────────────────────────────────────────────

	describe("successful fetch with valid data", () => {
		it("returns all products when no search query is provided", async () => {
			vi.mocked(api.get).mockResolvedValue({ data: VALID_PRODUCTS });
			const { result } = renderHook(() => useProducts(""));

			await waitFor(() => expect(result.current.loading).toBe(false));

			expect(result.current.products).toEqual(VALID_PRODUCTS);
			expect(result.current.error).toBeNull();
		});

		it("calls GET /api/products without params for an empty query", async () => {
			vi.mocked(api.get).mockResolvedValue({ data: [] });
			renderHook(() => useProducts(""));

			await waitFor(() => {});

			expect(api.get).toHaveBeenCalledWith("/api/products", { params: {} });
		});

		it("passes the trimmed search param when a query is provided", async () => {
			vi.mocked(api.get).mockResolvedValue({ data: [] });
			renderHook(() => useProducts("  socks  "));

			await waitFor(() => {});

			expect(api.get).toHaveBeenCalledWith("/api/products", {
				params: { search: "socks" },
			});
		});

		it("re-fetches when the search query changes", async () => {
			vi.mocked(api.get).mockResolvedValue({ data: [] });
			const { rerender } = renderHook(({ q }) => useProducts(q), {
				initialProps: { q: "" },
			});

			await waitFor(() => {});
			rerender({ q: "shoes" });

			await waitFor(() => {
				expect(api.get).toHaveBeenCalledTimes(2);
			});
		});
	});

	// ── b) Invalid / malformed API data (Zod catches it) ──────────────────────

	describe("Zod validation of API response", () => {
		it("sets an error when the API returns objects missing required fields", async () => {
			// priceCents is missing — ProductSchema should reject this
			const malformed = [
				{
					id: "p1",
					name: "Socks",
					image: "img.jpg",
					rating: { stars: 4, count: 1 },
				},
			];
			vi.mocked(api.get).mockResolvedValue({ data: malformed });

			const { result } = renderHook(() => useProducts(""));

			await waitFor(() => {
				expect(result.current.error).toBe(
					"Could not load products. Please try again.",
				);
			});
		});

		it("sets an error when the API returns a non-array (e.g. null)", async () => {
			vi.mocked(api.get).mockResolvedValue({ data: null });

			const { result } = renderHook(() => useProducts(""));

			await waitFor(() => {
				expect(result.current.error).toBe(
					"Could not load products. Please try again.",
				);
			});
		});

		it("sets an error when a product has an invalid priceCents (negative)", async () => {
			const invalid = [{ ...VALID_PRODUCTS[0], priceCents: -5 }];
			vi.mocked(api.get).mockResolvedValue({ data: invalid });

			const { result } = renderHook(() => useProducts(""));

			await waitFor(() => {
				expect(result.current.error).not.toBeNull();
			});
		});

		it("sets an error when a product has stars out of range", async () => {
			const invalid = [
				{ ...VALID_PRODUCTS[0], rating: { stars: 6, count: 1 } },
			];
			vi.mocked(api.get).mockResolvedValue({ data: invalid });

			const { result } = renderHook(() => useProducts(""));

			await waitFor(() => {
				expect(result.current.error).not.toBeNull();
			});
		});

		it("does NOT set an error for a valid empty array response", async () => {
			vi.mocked(api.get).mockResolvedValue({ data: [] });

			const { result } = renderHook(() => useProducts(""));

			await waitFor(() => expect(result.current.loading).toBe(false));
			expect(result.current.error).toBeNull();
			expect(result.current.products).toEqual([]);
		});
	});

	// ── c) Loading & error states ─────────────────────────────────────────────

	describe("loading state", () => {
		it("starts in a loading state", () => {
			vi.mocked(api.get).mockResolvedValue({ data: [] });
			const { result } = renderHook(() => useProducts(""));
			expect(result.current.loading).toBe(true);
		});

		it("sets loading to false after a successful fetch", async () => {
			vi.mocked(api.get).mockResolvedValue({ data: VALID_PRODUCTS });
			const { result } = renderHook(() => useProducts(""));

			await waitFor(() => expect(result.current.loading).toBe(false));
		});

		it("sets loading to false even when the request fails", async () => {
			vi.mocked(api.get).mockRejectedValue(new Error("Network"));
			const { result } = renderHook(() => useProducts(""));

			await waitFor(() => expect(result.current.loading).toBe(false));
		});
	});

	describe("error handling", () => {
		it("sets error message when the network request fails", async () => {
			vi.mocked(api.get).mockRejectedValue(new Error("Network"));
			const { result } = renderHook(() => useProducts(""));

			await waitFor(() => {
				expect(result.current.error).toBe(
					"Could not load products. Please try again.",
				);
			});
		});

		it("clears the error on the next successful fetch", async () => {
			vi.mocked(api.get)
				.mockRejectedValueOnce(new Error("fail"))
				.mockResolvedValueOnce({ data: VALID_PRODUCTS });

			const { result, rerender } = renderHook(({ q }) => useProducts(q), {
				initialProps: { q: "" },
			});

			await waitFor(() => expect(result.current.error).not.toBeNull());

			rerender({ q: "shoes" });

			await waitFor(() => {
				expect(result.current.error).toBeNull();
				expect(result.current.products).toEqual(VALID_PRODUCTS);
			});
		});
	});
});

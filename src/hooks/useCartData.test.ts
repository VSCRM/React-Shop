/**
 * Tests for the `useCartData` hook.
 *
 * Coverage:
 * a) Cart is populated from valid API data on mount.
 * b) Malformed API data (Zod error from loadToCart) surfaces the error message.
 * c) Manual reload, error clearing, and optimistic setCart.
 *
 * Note: `loadToCart` already applies Zod validation internally, so we mock
 * it at the service boundary — testing the hook's reaction to both resolved
 * and rejected promises.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useCartData } from "./useCartData";

vi.mock("@/services/loadToCart", () => ({
	loadToCart: vi.fn(),
}));

import { loadToCart } from "@/services/loadToCart";

// Fully typed cart stubs (satisfy CartItem shape after Zod parsing)
const CART_STUB = [
	{
		productId: "p1",
		quantity: 2,
		deliveryOptionId: "1",
		product: {
			id: "p1",
			name: "Socks",
			image: "img.jpg",
			priceCents: 1090,
			rating: { stars: 4.5, count: 87 },
		},
	},
	{
		productId: "p2",
		quantity: 1,
		deliveryOptionId: "2",
		product: {
			id: "p2",
			name: "Basketball",
			image: "img2.jpg",
			priceCents: 2095,
			rating: { stars: 4, count: 127 },
		},
	},
] as const;

beforeEach(() => vi.clearAllMocks());

describe("useCartData", () => {
	describe("initial mount", () => {
		it("starts with an empty cart", () => {
			vi.mocked(loadToCart).mockResolvedValue([]);
			const { result } = renderHook(() => useCartData());
			expect(result.current.cart).toEqual([]);
		});

		it("starts with no error", () => {
			vi.mocked(loadToCart).mockResolvedValue([]);
			const { result } = renderHook(() => useCartData());
			expect(result.current.cartError).toBeNull();
		});

		it("populates cart after successful fetch", async () => {
			vi.mocked(loadToCart).mockResolvedValue(CART_STUB as never);
			const { result } = renderHook(() => useCartData());

			await waitFor(() => {
				expect(result.current.cart).toEqual(CART_STUB);
			});
		});

		it("sets cartError when loadToCart rejects (e.g. Zod or network error)", async () => {
			vi.mocked(loadToCart).mockRejectedValue(
				new Error("ZodError: invalid data"),
			);
			const { result } = renderHook(() => useCartData());

			await waitFor(() => {
				expect(result.current.cartError).toBe(
					"Could not load cart. Please refresh the page.",
				);
			});
		});
	});

	describe("loadCart — manual refresh", () => {
		it("refreshes the cart with fresh data", async () => {
			vi.mocked(loadToCart)
				.mockResolvedValueOnce(CART_STUB as never)
				.mockResolvedValueOnce([
					{
						productId: "p3",
						quantity: 5,
						deliveryOptionId: "1",
						product: {
							id: "p3",
							name: "Hat",
							image: "hat.jpg",
							priceCents: 500,
							rating: { stars: 3, count: 5 },
						},
					},
				] as never);

			const { result } = renderHook(() => useCartData());

			await waitFor(() => expect(result.current.cart).toEqual(CART_STUB));

			await act(() => result.current.loadCart());

			expect(result.current.cart[0].productId).toBe("p3");
		});

		it("clears a previous error on successful reload", async () => {
			vi.mocked(loadToCart)
				.mockRejectedValueOnce(new Error("fail"))
				.mockResolvedValueOnce(CART_STUB as never);

			const { result } = renderHook(() => useCartData());

			await waitFor(() => expect(result.current.cartError).not.toBeNull());

			await act(() => result.current.loadCart());

			expect(result.current.cartError).toBeNull();
			expect(result.current.cart).toEqual(CART_STUB);
		});

		it("sets cartError when the reload also fails", async () => {
			vi.mocked(loadToCart).mockRejectedValue(new Error("always fails"));
			const { result } = renderHook(() => useCartData());

			await waitFor(() => expect(result.current.cartError).not.toBeNull());

			await act(() => result.current.loadCart());

			expect(result.current.cartError).toBe(
				"Could not load cart. Please refresh the page.",
			);
		});
	});

	describe("setCart — optimistic updates", () => {
		it("updates cart synchronously via setCart", async () => {
			vi.mocked(loadToCart).mockResolvedValue(CART_STUB as never);
			const { result } = renderHook(() => useCartData());

			await waitFor(() => expect(result.current.cart).toEqual(CART_STUB));

			act(() => result.current.setCart([]));

			expect(result.current.cart).toEqual([]);
		});
	});
});

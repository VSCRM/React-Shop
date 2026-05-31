/**
 * Tests for the `useCartActions` hook.
 *
 * All service modules are mocked at their import boundaries so these tests
 * verify only the hook's orchestration logic — correct delegation to services
 * and subsequent cart reload.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import type { ReactNode } from "react";
import { renderHook, act } from "@testing-library/react";
import { useCartActions } from "./useCartActions";
import { MemoryRouter } from "react-router";

vi.mock("@/services/addToCart", () => ({ addToCart: vi.fn() }));
vi.mock("@/services/updateCartQuantity", () => ({
	updateCartQuantity: vi.fn(),
}));
vi.mock("@/services/updateCartDelivery", () => ({
	updateCartDelivery: vi.fn(),
}));
vi.mock("@/services/deleteCartItem", () => ({ deleteCartItem: vi.fn() }));
vi.mock("@/services/createOrder", () => ({ createOrder: vi.fn() }));

import { addToCart } from "@/services/addToCart";
import { updateCartQuantity } from "@/services/updateCartQuantity";
import { updateCartDelivery } from "@/services/updateCartDelivery";
import { deleteCartItem } from "@/services/deleteCartItem";
import { createOrder } from "@/services/createOrder";

/** Helper: render the hook inside a MemoryRouter (required by useNavigate). */
const makeHook = (setCart = vi.fn(), loadCart = vi.fn()) => {
	const wrapper = ({ children }: { children: ReactNode }) => (
		<MemoryRouter>{children}</MemoryRouter>
	);
	return renderHook(() => useCartActions(setCart, loadCart), { wrapper });
};

beforeEach(() => vi.clearAllMocks());

describe("useCartActions", () => {
	describe("addCart", () => {
		it("calls addToCart with productId and quantity", async () => {
			vi.mocked(addToCart).mockResolvedValue(undefined);
			const loadCart = vi.fn().mockResolvedValue(undefined);
			const { result } = makeHook(vi.fn(), loadCart);

			await act(() => result.current.addCart("p1", 3));

			expect(addToCart).toHaveBeenCalledWith("p1", 3);
		});

		it("calls loadCart after a successful add", async () => {
			vi.mocked(addToCart).mockResolvedValue(undefined);
			const loadCart = vi.fn().mockResolvedValue(undefined);
			const { result } = makeHook(vi.fn(), loadCart);

			await act(() => result.current.addCart("p1", 1));

			expect(loadCart).toHaveBeenCalledTimes(1);
		});

		it("does not throw when addToCart rejects (error is swallowed)", async () => {
			vi.mocked(addToCart).mockRejectedValue(new Error("Network"));
			const { result } = makeHook();

			await expect(
				act(() => result.current.addCart("p1", 1)),
			).resolves.not.toThrow();
		});

		it("does NOT call loadCart when addToCart rejects", async () => {
			vi.mocked(addToCart).mockRejectedValue(new Error("Network"));
			const loadCart = vi.fn();
			const { result } = makeHook(vi.fn(), loadCart);

			await act(() => result.current.addCart("p1", 1));

			expect(loadCart).not.toHaveBeenCalled();
		});
	});

	describe("updateDeliveryOption", () => {
		it("calls updateCartDelivery with productId and deliveryOptionId", async () => {
			vi.mocked(updateCartDelivery).mockResolvedValue(undefined);
			const loadCart = vi.fn().mockResolvedValue(undefined);
			const { result } = makeHook(vi.fn(), loadCart);

			await act(() => result.current.updateDeliveryOption("p1", "opt-2"));

			expect(updateCartDelivery).toHaveBeenCalledWith("p1", "opt-2");
			expect(loadCart).toHaveBeenCalledTimes(1);
		});

		it("does not throw on failure", async () => {
			vi.mocked(updateCartDelivery).mockRejectedValue(new Error("fail"));
			const { result } = makeHook();

			await expect(
				act(() => result.current.updateDeliveryOption("p1", "opt-1")),
			).resolves.not.toThrow();
		});
	});

	describe("updateQuantity", () => {
		it("calls updateCartQuantity with productId and quantity", async () => {
			vi.mocked(updateCartQuantity).mockResolvedValue(undefined);
			const loadCart = vi.fn().mockResolvedValue(undefined);
			const { result } = makeHook(vi.fn(), loadCart);

			await act(() => result.current.updateQuantity("p2", 4));

			expect(updateCartQuantity).toHaveBeenCalledWith("p2", 4);
			expect(loadCart).toHaveBeenCalledTimes(1);
		});

		it("does not throw on failure", async () => {
			vi.mocked(updateCartQuantity).mockRejectedValue(new Error("fail"));
			const { result } = makeHook();

			await expect(
				act(() => result.current.updateQuantity("p2", 4)),
			).resolves.not.toThrow();
		});
	});

	describe("removeItem", () => {
		it("calls deleteCartItem with the correct payload", async () => {
			vi.mocked(deleteCartItem).mockResolvedValue(undefined);
			const loadCart = vi.fn().mockResolvedValue(undefined);
			const { result } = makeHook(vi.fn(), loadCart);

			await act(() => result.current.removeItem("p3"));

			expect(deleteCartItem).toHaveBeenCalledWith({
				cartItem: { productId: "p3" },
			});
			expect(loadCart).toHaveBeenCalledTimes(1);
		});
	});

	describe("placeOrder", () => {
		it("calls createOrder and then loadCart on success", async () => {
			vi.mocked(createOrder).mockResolvedValue({ id: "order-1" });
			const loadCart = vi.fn().mockResolvedValue(undefined);
			const { result } = makeHook(vi.fn(), loadCart);

			await act(() => result.current.placeOrder());

			expect(createOrder).toHaveBeenCalledTimes(1);
			expect(loadCart).toHaveBeenCalledTimes(1);
		});

		it("does not throw when createOrder rejects", async () => {
			vi.mocked(createOrder).mockRejectedValue(new Error("fail"));
			const { result } = makeHook();

			await expect(
				act(() => result.current.placeOrder()),
			).resolves.not.toThrow();
		});

		it("does NOT call loadCart when createOrder rejects", async () => {
			vi.mocked(createOrder).mockRejectedValue(new Error("fail"));
			const loadCart = vi.fn();
			const { result } = makeHook(vi.fn(), loadCart);

			await act(() => result.current.placeOrder());

			expect(loadCart).not.toHaveBeenCalled();
		});
	});
});

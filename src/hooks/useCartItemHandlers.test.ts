import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCartItemHandlers } from "./useCartItemHandlers";

const makeHook = (
	cartItem: { productId: string; quantity: number },
	updateQuantity = vi.fn(),
	removeItem = vi.fn(),
) =>
	renderHook(() => useCartItemHandlers(cartItem, updateQuantity, removeItem));

describe("useCartItemHandlers", () => {
	describe("initial state", () => {
		it("starts with isEditing = false", () => {
			const { result } = makeHook({ productId: "p1", quantity: 2 });
			expect(result.current.isEditing).toBe(false);
		});

		it("starts with isConfirmingDelete = false", () => {
			const { result } = makeHook({ productId: "p1", quantity: 2 });
			expect(result.current.isConfirmingDelete).toBe(false);
		});
	});

	describe("handleSaveQuantity", () => {
		it("calls updateQuantity with correct args", async () => {
			const updateQuantity = vi.fn().mockResolvedValue(undefined);
			const { result } = makeHook(
				{ productId: "p1", quantity: 2 },
				updateQuantity,
			);

			await act(() => result.current.handleSaveQuantity(5));

			expect(updateQuantity).toHaveBeenCalledWith("p1", 5);
		});

		it("sets isEditing to false after save", async () => {
			const updateQuantity = vi.fn().mockResolvedValue(undefined);
			const { result } = makeHook(
				{ productId: "p1", quantity: 2 },
				updateQuantity,
			);

			await act(() => {
				result.current.setIsEditing(true);
			});
			await act(() => result.current.handleSaveQuantity(3));

			expect(result.current.isEditing).toBe(false);
		});
	});

	describe("handleDeleteOne", () => {
		it("calls removeItem when quantity is 1", async () => {
			const removeItem = vi.fn().mockResolvedValue(undefined);
			const updateQuantity = vi.fn();
			const { result } = makeHook(
				{ productId: "p1", quantity: 1 },
				updateQuantity,
				removeItem,
			);

			await act(() => result.current.handleDeleteOne());

			expect(removeItem).toHaveBeenCalledWith("p1");
			expect(updateQuantity).not.toHaveBeenCalled();
		});

		it("decrements quantity by 1 when quantity > 1", async () => {
			const updateQuantity = vi.fn().mockResolvedValue(undefined);
			const removeItem = vi.fn();
			const { result } = makeHook(
				{ productId: "p1", quantity: 3 },
				updateQuantity,
				removeItem,
			);

			await act(() => result.current.handleDeleteOne());

			expect(updateQuantity).toHaveBeenCalledWith("p1", 2);
			expect(removeItem).not.toHaveBeenCalled();
		});

		it("sets isConfirmingDelete to false after delete", async () => {
			const removeItem = vi.fn().mockResolvedValue(undefined);
			const { result } = makeHook(
				{ productId: "p1", quantity: 1 },
				vi.fn(),
				removeItem,
			);

			await act(() => {
				result.current.setIsConfirmingDelete(true);
			});
			await act(() => result.current.handleDeleteOne());

			expect(result.current.isConfirmingDelete).toBe(false);
		});
	});

	describe("handleDeleteAll", () => {
		it("always calls removeItem regardless of quantity", async () => {
			const removeItem = vi.fn().mockResolvedValue(undefined);
			const { result } = makeHook(
				{ productId: "p2", quantity: 5 },
				vi.fn(),
				removeItem,
			);

			await act(() => result.current.handleDeleteAll());

			expect(removeItem).toHaveBeenCalledWith("p2");
		});
	});
});

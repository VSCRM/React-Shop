/**
 * Integration-level tests for all service functions.
 *
 * Strategy: mock the underlying axios instance (`@/services/api`) at the
 * module boundary so each test verifies only the service's own logic —
 * correct HTTP method, URL, and payload.
 *
 * Zod validation is exercised here too for the services that parse responses
 * (`loadToCart` and `createOrder`).
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/services/api", () => ({
	default: {
		get: vi.fn(),
		post: vi.fn(),
		put: vi.fn(),
		delete: vi.fn(),
	},
}));

import api from "@/services/api";
import { addToCart } from "./addToCart";
import { loadToCart } from "./loadToCart";
import { updateCartQuantity } from "./updateCartQuantity";
import { updateCartDelivery } from "./updateCartDelivery";
import { deleteCartItem } from "./deleteCartItem";
import { createOrder } from "./createOrder";

beforeEach(() => vi.clearAllMocks());

// ─── addToCart ────────────────────────────────────────────────────────────────

describe("addToCart", () => {
	it("POSTs to /api/cart-items with productId and quantity", async () => {
		vi.mocked(api.post).mockResolvedValue({ data: {} });

		await addToCart("prod-1", 3);

		expect(api.post).toHaveBeenCalledWith("/api/cart-items", {
			productId: "prod-1",
			quantity: 3,
		});
	});

	it("forwards the axios rejection on network failure", async () => {
		vi.mocked(api.post).mockRejectedValue(new Error("Network"));

		await expect(addToCart("x", 1)).rejects.toThrow("Network");
	});
});

// ─── loadToCart ───────────────────────────────────────────────────────────────

describe("loadToCart", () => {
	const validCartItems = [
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
	];

	it("GETs /api/cart-items?expand=product", async () => {
		vi.mocked(api.get).mockResolvedValue({ data: validCartItems });

		await loadToCart();

		expect(api.get).toHaveBeenCalledWith("/api/cart-items?expand=product");
	});

	it("returns Zod-validated cart items on a valid response", async () => {
		vi.mocked(api.get).mockResolvedValue({ data: validCartItems });

		const result = await loadToCart();

		expect(result).toEqual(validCartItems);
	});

	it("throws a ZodError when the API returns an invalid item (missing productId)", async () => {
		const invalid = [
			{
				quantity: 2,
				deliveryOptionId: "1",
				product: validCartItems[0].product,
			},
		];
		vi.mocked(api.get).mockResolvedValue({ data: invalid });

		await expect(loadToCart()).rejects.toThrow();
	});

	it("throws a ZodError when the API returns null", async () => {
		vi.mocked(api.get).mockResolvedValue({ data: null });

		await expect(loadToCart()).rejects.toThrow();
	});
});

// ─── updateCartQuantity ───────────────────────────────────────────────────────

describe("updateCartQuantity", () => {
	it("PUTs to /api/cart-items/:productId with new quantity", async () => {
		vi.mocked(api.put).mockResolvedValue({ data: {} });

		await updateCartQuantity("prod-2", 5);

		expect(api.put).toHaveBeenCalledWith("/api/cart-items/prod-2", {
			quantity: 5,
		});
	});
});

// ─── updateCartDelivery ───────────────────────────────────────────────────────

describe("updateCartDelivery", () => {
	it("PUTs to /api/cart-items/:productId with deliveryOptionId", async () => {
		vi.mocked(api.put).mockResolvedValue({ data: {} });

		await updateCartDelivery("prod-3", "delivery-opt-1");

		expect(api.put).toHaveBeenCalledWith("/api/cart-items/prod-3", {
			deliveryOptionId: "delivery-opt-1",
		});
	});
});

// ─── deleteCartItem ───────────────────────────────────────────────────────────

describe("deleteCartItem", () => {
	it("DELETEs /api/cart-items/:productId", async () => {
		vi.mocked(api.delete).mockResolvedValue({ data: {} });

		await deleteCartItem({ cartItem: { productId: "prod-4" } });

		expect(api.delete).toHaveBeenCalledWith("/api/cart-items/prod-4");
	});
});

// ─── createOrder ─────────────────────────────────────────────────────────────

describe("createOrder", () => {
	it("POSTs to /api/orders and returns Zod-validated response data", async () => {
		const orderPayload = { id: "order-99" };
		vi.mocked(api.post).mockResolvedValue({ data: orderPayload });

		const result = await createOrder();

		expect(api.post).toHaveBeenCalledWith("/api/orders");
		expect(result).toEqual(orderPayload);
	});

	it("throws a ZodError when the order response is missing the id field", async () => {
		vi.mocked(api.post).mockResolvedValue({ data: { name: "no-id" } });

		await expect(createOrder()).rejects.toThrow();
	});

	it("throws a ZodError when the order response has an empty id string", async () => {
		vi.mocked(api.post).mockResolvedValue({ data: { id: "" } });

		await expect(createOrder()).rejects.toThrow();
	});
});

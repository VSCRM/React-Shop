import { describe, it, expect } from "vitest";
import type { OrderProduct } from "@/types";
import { getTrackedProducts } from "./getTrackedProducts";

const p1 = {
	productId: "p1",
	quantity: 1,
	estimatedDeliveryTimeMs: 0,
	product: {
		id: "p1",
		name: "Shirt",
		image: "",
		priceCents: 0,
		rating: { stars: 4, count: 1 },
	},
} as OrderProduct;
const p2 = {
	productId: "p2",
	quantity: 1,
	estimatedDeliveryTimeMs: 0,
	product: {
		id: "p2",
		name: "Pants",
		image: "",
		priceCents: 0,
		rating: { stars: 4, count: 1 },
	},
} as OrderProduct;
const p1dup = {
	productId: "p1",
	quantity: 1,
	estimatedDeliveryTimeMs: 0,
	product: {
		id: "p1",
		name: "Shirt (duplicate)",
		image: "",
		priceCents: 0,
		rating: { stars: 4, count: 1 },
	},
} as OrderProduct;

const mockOrder = {
	id: "order-1",
	orderTimeMs: 0,
	totalCostCents: 0,
	products: [p1, p2, p1dup],
};

describe("getTrackedProducts", () => {
	it("returns an empty array when order is null", () => {
		expect(getTrackedProducts(null, "p1")).toEqual([]);
	});

	it("returns an empty array when order has no products field", () => {
		expect(getTrackedProducts({}, "p1")).toEqual([]);
	});

	it("returns all products when no productId is provided", () => {
		const result = getTrackedProducts(mockOrder, undefined);
		expect(result).toHaveLength(3);
	});

	it("filters by productId when provided", () => {
		const result = getTrackedProducts(mockOrder, "p1");
		expect(result).toHaveLength(2);
		result.forEach((p) => expect(p.productId).toBe("p1"));
	});

	it("returns an empty array when productId does not match any product", () => {
		const result = getTrackedProducts(mockOrder, "p999");
		expect(result).toEqual([]);
	});

	it("returns the correct single product when productId is unique", () => {
		const result = getTrackedProducts(mockOrder, "p2");
		expect(result).toHaveLength(1);
		expect(result[0].product.name).toBe("Pants");
	});
});

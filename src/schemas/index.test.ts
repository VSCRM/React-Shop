/**
 * Tests for all Zod schemas in `src/schemas/index.ts`.
 *
 * Coverage goals
 * ──────────────
 * a) Schemas accept well-formed (valid) data without errors.
 * b) Schemas reject malformed data with a ZodError.
 * c) Edge-case values (zero prices, empty arrays, boundary stars) are handled
 *    correctly.
 */

import { describe, it, expect } from "vitest";
import {
	RatingSchema,
	ProductSchema,
	ProductListSchema,
	DeliveryOptionSchema,
	DeliveryOptionListSchema,
	CartItemSchema,
	CartItemListSchema,
	OrderProductSchema,
	OrderSchema,
	OrderListSchema,
	CreatedOrderSchema,
	PaymentSummarySchema,
} from "./index";

// ─── Shared fixtures ──────────────────────────────────────────────────────────

const validRating = { stars: 4.5, count: 87 };

const validProduct = {
	id: "prod-1",
	name: "Cotton Socks",
	image: "images/products/socks.jpg",
	priceCents: 1090,
	rating: validRating,
};

const validDeliveryOption = {
	id: "opt-1",
	priceCents: 0,
	estimatedDeliveryTimeMs: 1_716_000_000_000,
};

const validCartItem = {
	productId: "prod-1",
	quantity: 2,
	deliveryOptionId: "opt-1",
	product: validProduct,
};

const validOrderProduct = {
	productId: "prod-1",
	quantity: 1,
	estimatedDeliveryTimeMs: 1_716_000_000_000,
	product: validProduct,
};

const validOrder = {
	id: "order-1",
	orderTimeMs: 1_710_000_000_000,
	totalCostCents: 1090,
	products: [validOrderProduct],
};

const validPaymentSummary = {
	totalItems: 2,
	productCostCents: 2180,
	shippingCostCents: 0,
	totalCostBeforeTaxCents: 2180,
	taxCents: 174,
	totalCostCents: 2354,
};

// ─── RatingSchema ─────────────────────────────────────────────────────────────

describe("RatingSchema", () => {
	it("accepts a valid rating", () => {
		expect(RatingSchema.safeParse(validRating).success).toBe(true);
	});

	it("accepts the minimum stars value (0)", () => {
		expect(RatingSchema.safeParse({ stars: 0, count: 0 }).success).toBe(true);
	});

	it("accepts the maximum stars value (5)", () => {
		expect(RatingSchema.safeParse({ stars: 5, count: 1 }).success).toBe(true);
	});

	it("rejects stars above 5", () => {
		const result = RatingSchema.safeParse({ stars: 5.1, count: 1 });
		expect(result.success).toBe(false);
	});

	it("rejects stars below 0", () => {
		const result = RatingSchema.safeParse({ stars: -0.1, count: 1 });
		expect(result.success).toBe(false);
	});

	it("rejects a negative count", () => {
		const result = RatingSchema.safeParse({ stars: 4, count: -1 });
		expect(result.success).toBe(false);
	});

	it("rejects a non-integer count", () => {
		const result = RatingSchema.safeParse({ stars: 4, count: 1.5 });
		expect(result.success).toBe(false);
	});

	it("rejects missing stars field", () => {
		const result = RatingSchema.safeParse({ count: 10 });
		expect(result.success).toBe(false);
	});

	it("rejects string stars", () => {
		const result = RatingSchema.safeParse({ stars: "4.5", count: 10 });
		expect(result.success).toBe(false);
	});
});

// ─── ProductSchema ────────────────────────────────────────────────────────────

describe("ProductSchema", () => {
	it("accepts a valid product", () => {
		const result = ProductSchema.safeParse(validProduct);
		expect(result.success).toBe(true);
	});

	it("parses and returns data with correct shape", () => {
		const result = ProductSchema.safeParse(validProduct);
		if (!result.success) throw result.error;
		expect(result.data).toMatchObject(validProduct);
	});

	it("accepts a product with priceCents = 0 (free item)", () => {
		const result = ProductSchema.safeParse({ ...validProduct, priceCents: 0 });
		expect(result.success).toBe(true);
	});

	it("rejects a negative priceCents", () => {
		const result = ProductSchema.safeParse({ ...validProduct, priceCents: -1 });
		expect(result.success).toBe(false);
	});

	it("rejects a non-integer priceCents", () => {
		const result = ProductSchema.safeParse({
			...validProduct,
			priceCents: 10.99,
		});
		expect(result.success).toBe(false);
	});

	it("rejects an empty id string", () => {
		const result = ProductSchema.safeParse({ ...validProduct, id: "" });
		expect(result.success).toBe(false);
	});

	it("rejects an empty name string", () => {
		const result = ProductSchema.safeParse({ ...validProduct, name: "" });
		expect(result.success).toBe(false);
	});

	it("rejects a missing rating field", () => {
		const { rating: _r, ...noRating } = validProduct;
		const result = ProductSchema.safeParse(noRating);
		expect(result.success).toBe(false);
	});

	it("rejects an invalid nested rating", () => {
		const result = ProductSchema.safeParse({
			...validProduct,
			rating: { stars: 6, count: 1 },
		});
		expect(result.success).toBe(false);
	});
});

describe("ProductListSchema", () => {
	it("accepts an array of valid products", () => {
		expect(
			ProductListSchema.safeParse([validProduct, validProduct]).success,
		).toBe(true);
	});

	it("accepts an empty array", () => {
		expect(ProductListSchema.safeParse([]).success).toBe(true);
	});

	it("rejects an array containing an invalid product", () => {
		const result = ProductListSchema.safeParse([
			validProduct,
			{ ...validProduct, priceCents: -10 },
		]);
		expect(result.success).toBe(false);
	});
});

// ─── DeliveryOptionSchema ─────────────────────────────────────────────────────

describe("DeliveryOptionSchema", () => {
	it("accepts a valid delivery option", () => {
		expect(DeliveryOptionSchema.safeParse(validDeliveryOption).success).toBe(
			true,
		);
	});

	it("accepts a free delivery option (priceCents = 0)", () => {
		expect(
			DeliveryOptionSchema.safeParse({ ...validDeliveryOption, priceCents: 0 })
				.success,
		).toBe(true);
	});

	it("accepts a negative estimatedDeliveryTimeMs (past dates in tests)", () => {
		// Negative timestamps are valid for historical/test data
		expect(
			DeliveryOptionSchema.safeParse({
				...validDeliveryOption,
				estimatedDeliveryTimeMs: -1,
			}).success,
		).toBe(true);
	});

	it("rejects a negative priceCents", () => {
		const result = DeliveryOptionSchema.safeParse({
			...validDeliveryOption,
			priceCents: -500,
		});
		expect(result.success).toBe(false);
	});

	it("rejects an empty id", () => {
		const result = DeliveryOptionSchema.safeParse({
			...validDeliveryOption,
			id: "",
		});
		expect(result.success).toBe(false);
	});
});

describe("DeliveryOptionListSchema", () => {
	it("accepts an empty array", () => {
		expect(DeliveryOptionListSchema.safeParse([]).success).toBe(true);
	});

	it("accepts multiple valid options", () => {
		expect(
			DeliveryOptionListSchema.safeParse([
				validDeliveryOption,
				validDeliveryOption,
			]).success,
		).toBe(true);
	});
});

// ─── CartItemSchema ───────────────────────────────────────────────────────────

describe("CartItemSchema", () => {
	it("accepts a valid cart item", () => {
		expect(CartItemSchema.safeParse(validCartItem).success).toBe(true);
	});

	it("rejects quantity = 0", () => {
		const result = CartItemSchema.safeParse({ ...validCartItem, quantity: 0 });
		expect(result.success).toBe(false);
	});

	it("rejects a negative quantity", () => {
		const result = CartItemSchema.safeParse({ ...validCartItem, quantity: -1 });
		expect(result.success).toBe(false);
	});

	it("rejects a non-integer quantity", () => {
		const result = CartItemSchema.safeParse({
			...validCartItem,
			quantity: 1.5,
		});
		expect(result.success).toBe(false);
	});

	it("rejects an empty productId", () => {
		const result = CartItemSchema.safeParse({
			...validCartItem,
			productId: "",
		});
		expect(result.success).toBe(false);
	});

	it("rejects an empty deliveryOptionId", () => {
		const result = CartItemSchema.safeParse({
			...validCartItem,
			deliveryOptionId: "",
		});
		expect(result.success).toBe(false);
	});

	it("rejects an invalid nested product", () => {
		const result = CartItemSchema.safeParse({
			...validCartItem,
			product: { ...validProduct, priceCents: -1 },
		});
		expect(result.success).toBe(false);
	});
});

describe("CartItemListSchema", () => {
	it("accepts an empty cart", () => {
		expect(CartItemListSchema.safeParse([]).success).toBe(true);
	});

	it("accepts multiple cart items", () => {
		expect(
			CartItemListSchema.safeParse([validCartItem, validCartItem]).success,
		).toBe(true);
	});
});

// ─── OrderProductSchema ───────────────────────────────────────────────────────

describe("OrderProductSchema", () => {
	it("accepts a valid order product", () => {
		expect(OrderProductSchema.safeParse(validOrderProduct).success).toBe(true);
	});

	it("rejects quantity = 0", () => {
		const result = OrderProductSchema.safeParse({
			...validOrderProduct,
			quantity: 0,
		});
		expect(result.success).toBe(false);
	});
});

// ─── OrderSchema ──────────────────────────────────────────────────────────────

describe("OrderSchema", () => {
	it("accepts a valid order", () => {
		expect(OrderSchema.safeParse(validOrder).success).toBe(true);
	});

	it("accepts an order with an empty products array", () => {
		expect(OrderSchema.safeParse({ ...validOrder, products: [] }).success).toBe(
			true,
		);
	});

	it("rejects a negative totalCostCents", () => {
		const result = OrderSchema.safeParse({ ...validOrder, totalCostCents: -1 });
		expect(result.success).toBe(false);
	});

	it("rejects an empty id", () => {
		const result = OrderSchema.safeParse({ ...validOrder, id: "" });
		expect(result.success).toBe(false);
	});

	it("rejects an invalid product inside products array", () => {
		const result = OrderSchema.safeParse({
			...validOrder,
			products: [{ ...validOrderProduct, quantity: 0 }],
		});
		expect(result.success).toBe(false);
	});
});

describe("OrderListSchema", () => {
	it("accepts an empty orders list", () => {
		expect(OrderListSchema.safeParse([]).success).toBe(true);
	});

	it("accepts multiple valid orders", () => {
		expect(OrderListSchema.safeParse([validOrder, validOrder]).success).toBe(
			true,
		);
	});
});

// ─── CreatedOrderSchema ───────────────────────────────────────────────────────

describe("CreatedOrderSchema", () => {
	it("accepts a minimal created order with only id", () => {
		expect(CreatedOrderSchema.safeParse({ id: "new-order-1" }).success).toBe(
			true,
		);
	});

	it("accepts extra unknown fields (passthrough-like behaviour with strip)", () => {
		// Zod strips extra keys by default — this should still succeed
		expect(
			CreatedOrderSchema.safeParse({ id: "x", extra: "foo" }).success,
		).toBe(true);
	});

	it("rejects an empty id", () => {
		const result = CreatedOrderSchema.safeParse({ id: "" });
		expect(result.success).toBe(false);
	});

	it("rejects missing id field", () => {
		const result = CreatedOrderSchema.safeParse({});
		expect(result.success).toBe(false);
	});
});

// ─── PaymentSummarySchema ─────────────────────────────────────────────────────

describe("PaymentSummarySchema", () => {
	it("accepts a valid payment summary", () => {
		expect(PaymentSummarySchema.safeParse(validPaymentSummary).success).toBe(
			true,
		);
	});

	it("accepts all-zero values (empty cart edge case)", () => {
		const zeros = {
			totalItems: 0,
			productCostCents: 0,
			shippingCostCents: 0,
			totalCostBeforeTaxCents: 0,
			taxCents: 0,
			totalCostCents: 0,
		};
		expect(PaymentSummarySchema.safeParse(zeros).success).toBe(true);
	});

	it("rejects a missing field", () => {
		const { taxCents: _t, ...noTax } = validPaymentSummary;
		const result = PaymentSummarySchema.safeParse(noTax);
		expect(result.success).toBe(false);
	});

	it("rejects a negative productCostCents", () => {
		const result = PaymentSummarySchema.safeParse({
			...validPaymentSummary,
			productCostCents: -1,
		});
		expect(result.success).toBe(false);
	});

	it("rejects a non-integer totalCostCents", () => {
		const result = PaymentSummarySchema.safeParse({
			...validPaymentSummary,
			totalCostCents: 23.54,
		});
		expect(result.success).toBe(false);
	});

	it("returns parsed data with correct field values", () => {
		const result = PaymentSummarySchema.safeParse(validPaymentSummary);
		if (!result.success) throw result.error;
		expect(result.data.totalCostCents).toBe(2354);
	});
});

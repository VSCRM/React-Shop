/**
 * @module schemas
 *
 * Zod runtime-validation schemas for every domain type used across the app.
 *
 * All TypeScript types (see `src/types/index.ts`) are derived from these schemas
 * via `z.infer`, so this file is the **single source of truth** for both runtime
 * validation and static typing.
 *
 * Usage pattern
 * ─────────────
 *   import { ProductSchema } from '@/schemas';
 *
 *   const parsed = ProductSchema.safeParse(rawData);
 *   if (!parsed.success) {
 *     // Zod gives you a detailed ZodError — log it, throw, or return a fallback
 *     console.error(parsed.error.format());
 *   } else {
 *     const product = parsed.data; // fully typed Product
 *   }
 */

import { z } from "zod";

// ─── Primitive sub-schemas ────────────────────────────────────────────────────

/**
 * Star rating attached to a product.
 * `stars` is coerced to one decimal by the API but we only validate bounds here.
 */
export const RatingSchema = z.object({
	stars: z.number().min(0).max(5),
	count: z.number().int().nonnegative(),
});

// ─── Product ──────────────────────────────────────────────────────────────────

/** A single catalogue product returned by GET /api/products. */
export const ProductSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	image: z.string().min(1),
	priceCents: z.number().int().nonnegative(),
	rating: RatingSchema,
});

/** Array variant used by list endpoints. */
export const ProductListSchema = z.array(ProductSchema);

// ─── Delivery options ─────────────────────────────────────────────────────────

/**
 * A single delivery-speed option returned by
 * GET /api/delivery-options?expand=estimatedDeliveryTime.
 */
export const DeliveryOptionSchema = z.object({
	id: z.string().min(1),
	priceCents: z.number().int().nonnegative(),
	estimatedDeliveryTimeMs: z.number().int(),
});

export const DeliveryOptionListSchema = z.array(DeliveryOptionSchema);

// ─── Cart ─────────────────────────────────────────────────────────────────────

/**
 * A single cart item returned by GET /api/cart-items?expand=product.
 * Each item embeds its full product object.
 */
export const CartItemSchema = z.object({
	productId: z.string().min(1),
	quantity: z.number().int().positive(),
	deliveryOptionId: z.string().min(1),
	product: ProductSchema,
});

export const CartItemListSchema = z.array(CartItemSchema);

// ─── Orders ───────────────────────────────────────────────────────────────────

/**
 * A product line embedded inside an order.
 */
export const OrderProductSchema = z.object({
	productId: z.string().min(1),
	quantity: z.number().int().positive(),
	estimatedDeliveryTimeMs: z.number().int(),
	product: ProductSchema,
});

/**
 * A full order object returned by GET /api/orders?expand=products
 * or GET /api/orders/:id?expand=products.
 */
export const OrderSchema = z.object({
	id: z.string().min(1),
	orderTimeMs: z.number().int().nonnegative(),
	totalCostCents: z.number().int().nonnegative(),
	products: z.array(OrderProductSchema),
});

export const OrderListSchema = z.array(OrderSchema);

/**
 * The payload returned by POST /api/orders.
 * Only `id` is guaranteed; other fields are optional on creation.
 */
export const CreatedOrderSchema = z.object({
	id: z.string().min(1),
});

// ─── Payment summary ──────────────────────────────────────────────────────────

/**
 * Breakdown of costs shown on the checkout page,
 * returned by GET /api/payment-summary.
 */
export const PaymentSummarySchema = z.object({
	totalItems: z.number().int().nonnegative(),
	productCostCents: z.number().int().nonnegative(),
	shippingCostCents: z.number().int().nonnegative(),
	totalCostBeforeTaxCents: z.number().int().nonnegative(),
	taxCents: z.number().int().nonnegative(),
	totalCostCents: z.number().int().nonnegative(),
});

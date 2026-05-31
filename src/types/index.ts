/**
 * @module types
 *
 * All application-wide TypeScript types are derived from the Zod schemas
 * defined in `src/schemas/index.ts` using `z.infer`.
 *
 * This makes the schemas the **single source of truth**: change a schema once
 * and both runtime validation and static types update automatically.
 */

import type { z } from "zod";
import type {
	RatingSchema,
	ProductSchema,
	DeliveryOptionSchema,
	CartItemSchema,
	OrderProductSchema,
	OrderSchema,
	PaymentSummarySchema,
	CreatedOrderSchema,
} from "@/schemas";

// ─── Domain types (inferred from Zod schemas) ─────────────────────────────────

/** Star/count rating attached to a product. */
export type Rating = z.infer<typeof RatingSchema>;

/** A catalogue product returned by the API. */
export type Product = z.infer<typeof ProductSchema>;

/** A single shipping-speed option. */
export type DeliveryOption = z.infer<typeof DeliveryOptionSchema>;

/** A cart line-item (includes the embedded product). */
export type CartItem = z.infer<typeof CartItemSchema>;

/** A product line embedded inside an order. */
export type OrderProduct = z.infer<typeof OrderProductSchema>;

/** A full order with its embedded products. */
export type Order = z.infer<typeof OrderSchema>;

/** Cost breakdown shown on the checkout page. */
export type PaymentSummary = z.infer<typeof PaymentSummarySchema>;

/** Minimal payload returned when a new order is created. */
export type CreatedOrder = z.infer<typeof CreatedOrderSchema>;

// ─── UI / application types (not directly from the API) ──────────────────────

/**
 * The three possible tracking states for an order product.
 * Kept as a manual union so it can be used independently of the API layer.
 */
export type TrackingStatus = "Preparing" | "Shipped" | "Delivered";

/** Shape of the value provided by CartContext to all consumers. */
export interface CartContextValue {
	cart: CartItem[];
	cartError: string | null;
	loadCart: () => Promise<void>;
	addCart: (productId: string, quantity: number) => Promise<void>;
	updateDeliveryOption: (
		productId: string,
		deliveryOptionId: string,
	) => Promise<void>;
	updateQuantity: (productId: string, quantity: number) => Promise<void>;
	removeItem: (productId: string) => Promise<void>;
	placeOrder: () => Promise<void>;
}

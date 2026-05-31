/**
 * Fetches the current user's cart from the API.
 *
 * The raw response is validated at runtime with Zod before being returned,
 * so callers receive a fully typed `CartItem[]` or a thrown error.
 */

import type { CartItem } from "@/types";
import { CartItemListSchema } from "@/schemas";
import api from "@/services/api";

/**
 * GET /api/cart-items?expand=product
 *
 * @returns A promise that resolves to the validated cart items array.
 * @throws {ZodError}  If the API response doesn't match `CartItemListSchema`.
 * @throws {AxiosError} If the network request fails.
 */
export const loadToCart = async (): Promise<CartItem[]> => {
	const response = await api.get<unknown>("/api/cart-items?expand=product");
	// Runtime-validate the raw response so callers always get typed data.
	return CartItemListSchema.parse(response.data);
};

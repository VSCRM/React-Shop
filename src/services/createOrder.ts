/**
 * Places a new order from the current cart contents.
 *
 * The API response is validated against `CreatedOrderSchema` so callers
 * receive a properly typed `CreatedOrder` object.
 */

import type { CreatedOrder } from "@/types";
import { CreatedOrderSchema } from "@/schemas";
import api from "@/services/api";

/**
 * POST /api/orders
 *
 * @returns A promise that resolves to the created order (at minimum its `id`).
 * @throws {ZodError}   If the server response doesn't match the expected shape.
 * @throws {AxiosError} If the network request fails.
 */
export const createOrder = async (): Promise<CreatedOrder> => {
	const response = await api.post<unknown>("/api/orders");
	return CreatedOrderSchema.parse(response.data);
};

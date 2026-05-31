/**
 * Fetches a single order by ID.
 *
 * Validates the API response with `OrderSchema` at runtime.
 */

import { useState, useEffect } from "react";
import type { Order } from "@/types";
import { OrderSchema } from "@/schemas";
import api from "@/services/api";

interface UseOrderResult {
	order: Order | null;
	loading: boolean;
	error: string | null;
}

/**
 * @param orderId - The order ID to fetch. If undefined, no request is made.
 */
export function useOrder(orderId?: string): UseOrderResult {
	const [order, setOrder] = useState<Order | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!orderId) return;

		const fetchOrder = async (): Promise<void> => {
			try {
				setLoading(true);
				setError(null);

				const response = await api.get<unknown>(
					`/api/orders/${orderId}?expand=products`,
				);

				// Runtime validation — throws ZodError on unexpected shape.
				const validated = OrderSchema.parse(response.data);
				setOrder(validated);
			} catch {
				setError("Could not load order. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchOrder();
	}, [orderId]);

	return {
		order,
		loading,
		error,
	};
}

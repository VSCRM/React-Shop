/**
 * Fetches and manages the full list of orders.
 *
 * Validates the API response with `OrderListSchema` at runtime.
 */

import { useState, useEffect } from "react";
import type { Order } from "@/types";
import { OrderListSchema } from "@/schemas";
import api from "@/services/api";

interface UseOrdersResult {
	orders: Order[];
	loading: boolean;
	error: string | null;
}

/** Fetches GET /api/orders?expand=products once on mount. */
export function useOrders(): UseOrdersResult {
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOrders = async (): Promise<void> => {
			try {
				setLoading(true);
				setError(null);

				const response = await api.get<unknown>("/api/orders?expand=products");

				// Runtime validation — throws ZodError on unexpected shape.
				const validated = OrderListSchema.parse(response.data);
				setOrders(validated);
			} catch {
				setError("Could not load orders. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, []);

	return {
		orders,
		loading,
		error,
	};
}

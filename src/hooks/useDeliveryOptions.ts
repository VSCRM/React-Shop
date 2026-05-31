/**
 * Fetches and manages the available delivery options.
 *
 * Validates the raw API response with `DeliveryOptionListSchema` at runtime.
 */

import { useState, useEffect } from "react";
import type { DeliveryOption } from "@/types";
import { DeliveryOptionListSchema } from "@/schemas";
import api from "@/services/api";

interface UseDeliveryOptionsResult {
	deliveryOptions: DeliveryOption[];
	loading: boolean;
	error: string | null;
}

/**
 * Fetches GET /api/delivery-options?expand=estimatedDeliveryTime once on mount.
 */
export function useDeliveryOptions(): UseDeliveryOptionsResult {
	const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchDeliveryOptions = async (): Promise<void> => {
			try {
				setLoading(true);
				setError(null);

				const response = await api.get<unknown>(
					"/api/delivery-options?expand=estimatedDeliveryTime",
				);

				// Runtime validation — throws ZodError on unexpected shape.
				const validated = DeliveryOptionListSchema.parse(response.data);
				setDeliveryOptions(validated);
			} catch {
				setError("Could not load delivery options. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchDeliveryOptions();
	}, []);

	return {
		deliveryOptions,
		loading,
		error,
	};
}

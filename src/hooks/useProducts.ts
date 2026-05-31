/**
 * Fetches and manages the products list.
 *
 * Validates the raw API response with `ProductListSchema` at runtime, so the
 * component tree only ever receives properly typed `Product[]` data.
 */

import { useState, useEffect } from "react";
import type { Product } from "@/types";
import { ProductListSchema } from "@/schemas";
import api from "@/services/api";

interface UseProductsResult {
	products: Product[];
	loading: boolean;
	error: string | null;
}

/**
 * @param searchQuery - Optional search string. Whitespace is trimmed before the
 *   API call is made. Re-fetches whenever the trimmed query changes.
 */
export function useProducts(searchQuery = ""): UseProductsResult {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async (): Promise<void> => {
			try {
				setLoading(true);
				setError(null);

				const trimmedQuery = searchQuery.trim();
				const queryParams = trimmedQuery ? { search: trimmedQuery } : {};

				const response = await api.get<unknown>("/api/products", {
					params: queryParams,
				});

				// Validate: throws ZodError if the server returns unexpected data.
				const validated = ProductListSchema.parse(response.data);
				setProducts(validated);
			} catch {
				setError("Could not load products. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [searchQuery]);

	return {
		products,
		loading,
		error,
	};
}

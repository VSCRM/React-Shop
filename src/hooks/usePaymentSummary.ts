/**
 * Fetches and manages the payment/cost summary for the current cart.
 *
 * Validates the API response with `PaymentSummarySchema` at runtime.
 * Re-fetches whenever the cart contents change.
 */

import { useState, useEffect } from "react";
import type { CartItem, PaymentSummary } from "@/types";
import { PaymentSummarySchema } from "@/schemas";
import api from "@/services/api";

interface UsePaymentSummaryProps {
	cart: CartItem[];
}

interface UsePaymentSummaryResult {
	paymentSummary: PaymentSummary | null;
	loading: boolean;
	error: string | null;
}

/**
 * @param cart - Current cart items. The hook re-fetches whenever this changes.
 */
export function usePaymentSummary({
	cart,
}: UsePaymentSummaryProps): UsePaymentSummaryResult {
	const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPaymentSummary = async (): Promise<void> => {
			try {
				setLoading(true);
				setError(null);

				const response = await api.get<unknown>("/api/payment-summary");

				// Runtime validation — throws ZodError on unexpected shape.
				const validated = PaymentSummarySchema.parse(response.data);
				setPaymentSummary(validated);
			} catch {
				setError("Could not load payment summary. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchPaymentSummary();
	}, [cart]);

	return {
		paymentSummary,
		loading,
		error,
	};
}

import { useState, useEffect } from 'react';
import type { CartItem, PaymentSummary } from '@/types';
import api from '@/services/api';

interface Props {
	cart: CartItem[];
}

export function usePaymentSummary({ cart }: Props) {
	const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPaymentSummary = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await api.get<PaymentSummary>('/api/payment-summary');
				setPaymentSummary(response.data);
			} catch {
				setError('Could not load payment summary. Please try again.');
			} finally {
				setLoading(false);
			}
		};
		fetchPaymentSummary();
	}, [cart]);

	return { paymentSummary, loading, error };
}

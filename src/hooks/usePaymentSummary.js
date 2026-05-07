import { useState, useEffect } from 'react';
import api from '@/services/api';

export function usePaymentSummary({ cart }) {
	const [paymentSummary, setPaymentSummary] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPaymentSummary = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await api.get('/api/payment-summary');
				setPaymentSummary(response.data);
			} catch {
				setError('Could not load payment summary. Please try again.');
			} finally {
				setLoading(false);
			}
		};
		fetchPaymentSummary();
	}, [cart]);

	return {
		paymentSummary, loading, error
	};
}

import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '@/services/api';

export function usePaymentSummary({ cart }) {
	const [paymentSummary, setPaymentSummary] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const controller = new AbortController();

		const fetchPaymentSummary = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await api.get('/api/payment-summary', {
					signal: controller.signal,
				});
				setPaymentSummary(response.data);
			} catch (err) {
				if (axios.isCancel(err)) return;
				setError('Could not load payment summary. Please try again.');
			} finally {
				if (!controller.signal.aborted) {
					setLoading(false);
				}
			}
		};

		fetchPaymentSummary();
		return () => controller.abort();
	}, [cart]);

	return {
		paymentSummary, loading, error
	};
}

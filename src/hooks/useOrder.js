import { useState, useEffect } from 'react';
import api from '@/services/api';

export function useOrder(orderId) {
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!orderId) return;

		const fetchOrder = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await api.get(`/api/orders/${orderId}?expand=products`);
				setOrder(response.data);
			} catch {
				setError('Could not load order. Please try again.');
			} finally {
				setLoading(false);
			}
		};

		fetchOrder();
	}, [orderId]);

	return {
		order, loading, error
	};
}

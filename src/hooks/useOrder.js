import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '@/services/api';

export function useOrder(orderId) {
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!orderId) return;

		const controller = new AbortController();

		const fetchOrder = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await api.get(
					`/api/orders/${orderId}?expand=products`,
					{ signal: controller.signal }
				);
				setOrder(response.data);
			} catch (err) {
				if (axios.isCancel(err)) return;
				setError('Could not load order. Please try again.');
			} finally {
				if (!controller.signal.aborted) {
					setLoading(false);
				}
			}
		};

		fetchOrder();
		return () => controller.abort();
	}, [orderId]);

	return {
		order, loading, error
	};
}

import { useState, useEffect } from 'react';
import type { Order } from '@/types';
import api from '@/services/api';

export function useOrder(orderId?: string) {
	const [order, setOrder] = useState<Order | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!orderId) return;

		const fetchOrder = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await api.get<Order>(`/api/orders/${orderId}?expand=products`);
				setOrder(response.data);
			} catch {
				setError('Could not load order. Please try again.');
			} finally {
				setLoading(false);
			}
		};

		fetchOrder();
	}, [orderId]);

	return { order, loading, error };
}

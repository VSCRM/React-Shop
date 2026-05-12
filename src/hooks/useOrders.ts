import { useState, useEffect } from 'react';
import type { Order } from '@/types';
import api from '@/services/api';

export function useOrders() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await api.get<Order[]>('/api/orders?expand=products');
				setOrders(response.data);
			} catch {
				setError('Could not load orders. Please try again.');
			} finally {
				setLoading(false);
			}
		};
		fetchOrders();
	}, []);

	return { orders, loading, error };
}

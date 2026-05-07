import { useState, useEffect } from 'react';
import api from '@/services/api';

export function useOrders() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await api.get('/api/orders?expand=products');
				setOrders(response.data);
			} catch {
				setError('Could not load orders. Please try again.');
			} finally {
				setLoading(false);
			}
		};
		fetchOrders();
	}, []);

	return {
		orders, loading, error
	};
}

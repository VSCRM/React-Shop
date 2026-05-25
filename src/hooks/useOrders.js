import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '@/services/api';

export function useOrders() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const controller = new AbortController();

		const fetchOrders = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await api.get('/api/orders?expand=products', {
					signal: controller.signal,
				});
				setOrders(response.data);
			} catch (err) {
				if (axios.isCancel(err)) return;
				setError('Could not load orders. Please try again.');
			} finally {
				if (!controller.signal.aborted) {
					setLoading(false);
				}
			}
		};

		fetchOrders();
		return () => controller.abort();
	}, []);

	return {
		orders, loading, error
	};
}

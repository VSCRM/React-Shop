import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '@/services/api';

export function useProducts(searchQuery = '') {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const controller = new AbortController();

		const fetchProducts = async () => {
			try {
				setLoading(true);
				setError(null);
				const trimmedQuery = searchQuery.trim();
				const queryParams = trimmedQuery ? { search: trimmedQuery } : {};
				const response = await api.get('/api/products', {
					params: queryParams,
					signal: controller.signal,
				});
				setProducts(response.data);
			} catch (err) {
				if (axios.isCancel(err)) return;
				setError('Could not load products. Please try again.');
			} finally {
				if (!controller.signal.aborted) {
					setLoading(false);
				}
			}
		};

		fetchProducts();
		return () => controller.abort();
	}, [searchQuery]);

	return {
		products, loading, error
	};
}

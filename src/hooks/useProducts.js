import { useState, useEffect } from 'react';
import api from '@/services/api';

export function useProducts(searchQuery = '') {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				setError(null);
				const trimmedQuery = searchQuery.trim();
				const queryParams = trimmedQuery ? { search: trimmedQuery } : {};
				const response = await api.get('/api/products', { params: queryParams });
				setProducts(response.data);
			} catch {
				setError('Could not load products. Please try again.');
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, [searchQuery]);

	return {
		products, loading, error
	};
}

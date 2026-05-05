import axios from "axios";
import { useState, useEffect } from "react";

export function useProducts(searchQuery = '') {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const trimmedQuery = searchQuery.trim();
			const queryParams = trimmedQuery ? { search: trimmedQuery } : {};
			const productsResponse = await axios.get('/api/products', { params: queryParams });
			setProducts(productsResponse.data);
		};
		fetchProducts();
	}, [searchQuery]);

	return (
		products
	);
}

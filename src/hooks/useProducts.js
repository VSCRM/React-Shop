import axios from "axios";
import { useState, useEffect } from "react";

export function useProducts() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await axios.get('/api/products');
			setProducts(response.data);
		};
		fetchProducts();
	}, []);

	return (
		products
	);
}

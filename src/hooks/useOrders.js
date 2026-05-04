import axios from 'axios';
import { useState, useEffect } from 'react';

export function useOrders() {
	const [orders, setOrder] = useState([]);

	useEffect(() => {
		const fetchOrders = async () => {
			const response = await axios.get('/api/orders?expand=products');
			setOrder(response.data);
		};
		fetchOrders();
	}, [])

	return (
		orders
	);
}

import axios from 'axios';
import { useState, useEffect } from 'react';

export function useOrders() {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const fetchOrders = async () => {
			const response = await axios.get('/api/orders?expand=products');
			setOrders(response.data);
		};
		fetchOrders();
	}, [])

	return (
		orders
	);
}

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { OrderHeader } from './OrderHeader';
import { OrderDetail } from './OrderDetail';
import './OrdersPage.css';

export function OrdersPage({ cart }) {
	const [orders, setOrder] = useState([]);

	useEffect(() => {
		axios.get('/api/orders?expand=products')
			.then((response) => {
				setOrder(response.data);
			});
	}, [])

	return (
		<>
			<title>Orders</title>

			<Header cart={cart} />

			<div className="orders-page">
				<div className="page-title">Your Orders</div>

				<div className="orders-grid">
					{orders.map((singleOrder) => {
						return (
							<div key={singleOrder.id} className="order-container">
								<OrderHeader singleOrder={singleOrder} />

								<OrderDetail singleOrder={singleOrder} />
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

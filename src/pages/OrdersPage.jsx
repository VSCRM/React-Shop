import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router';
import { Header } from '../components/Header';
import { formatMoney } from '../utils/money';
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
								<div className="order-header">
									<div className="order-header-left-section">
										<div className="order-date">
											<div className="order-header-label">Order Placed:</div>
											<div>{dayjs(singleOrder.orderTimeMs).format('MMMM D')}</div>
										</div>
										<div className="order-total">
											<div className="order-header-label">Total:</div>
											<div>{formatMoney(singleOrder.totalCostCents)}</div>
										</div>
									</div>

									<div className="order-header-right-section">
										<div className="order-header-label">Order ID:</div>
										<div>{singleOrder.id}</div>
									</div>
								</div>

								<div className="order-details-grid">
									{singleOrder.products.map((orderProduct) => {
										return (
											<Fragment key={orderProduct.productId}>
												<div className="product-image-container">
													<img src={orderProduct.product.image} />
												</div>

												<div className="product-details">
													<div className="product-name">
														{orderProduct.product.name}
													</div>
													<div className="product-delivery-date">
														Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
													</div>
													<div className="product-quantity">Quantity: {orderProduct.quantity}</div>
													<button className="buy-again-button button-primary">
														<img className="buy-again-icon" src="images/icons/buy-again.png" />
														<span className="buy-again-message">Add to Cart</span>
													</button>
												</div>

												<div className="product-actions">
													<Link to="/tracking">
														<button className="track-package-button button-secondary">
															Track package
														</button>
													</Link>
												</div>
											</Fragment>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

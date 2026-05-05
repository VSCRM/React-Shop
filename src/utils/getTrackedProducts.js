export const getTrackedProducts = (order, productId) => {
	if (!order || !order.products) return [];

	return (
		productId
			? order.products.filter((p) => p.productId === productId)
			: order.products
	);
};

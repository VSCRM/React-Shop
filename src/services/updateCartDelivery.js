import axios from 'axios';

export const updateCartDelivery = async (productId, deliveryOptionId) => {
	return await axios.put(`/api/cart-items/${productId}`, { deliveryOptionId });
};

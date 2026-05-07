import api from '@/services/api';

export const updateCartDelivery = async (productId, deliveryOptionId) => {
	return await api.put(`/api/cart-items/${productId}`, { deliveryOptionId });
};

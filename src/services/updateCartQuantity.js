import api from '@/services/api';

export const updateCartQuantity = async (productId, quantity) => {
	return await api.put(`/api/cart-items/${productId}`, { quantity });
};

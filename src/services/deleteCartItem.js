import api from '@/services/api';

export const deleteCartItem = async ({ cartItem }) => {
	return await api.delete(`/api/cart-items/${cartItem.productId}`);
};

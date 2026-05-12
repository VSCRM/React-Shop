import api from '@/services/api';

export const updateCartQuantity = async (productId: string, quantity: number): Promise<void> => {
	await api.put(`/api/cart-items/${productId}`, { quantity });
};

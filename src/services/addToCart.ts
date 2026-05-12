import api from '@/services/api';

export const addToCart = async (productId: string, quantity: number): Promise<void> => {
	await api.post('/api/cart-items', { productId, quantity });
};

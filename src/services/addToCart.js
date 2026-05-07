import api from '@/services/api';

export const addToCart = async (productId, quantity) => {
	return await api.post('/api/cart-items', { productId, quantity });
};

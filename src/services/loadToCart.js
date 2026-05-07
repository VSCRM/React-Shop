import api from '@/services/api';

export const loadToCart = async () => {
	const response = await api.get('/api/cart-items?expand=product');
	return response.data;
};

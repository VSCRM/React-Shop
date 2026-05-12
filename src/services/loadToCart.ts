import type { CartItem } from '@/types';
import api from '@/services/api';

export const loadToCart = async (): Promise<CartItem[]> => {
	const response = await api.get<CartItem[]>('/api/cart-items?expand=product');
	return response.data;
};

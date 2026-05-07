import api from '@/services/api';

export const createOrder = async () => {
	const response = await api.post('/api/orders');
	return response.data;
};

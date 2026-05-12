import api from '@/services/api';

export const createOrder = async (): Promise<unknown> => {
  const response = await api.post('/api/orders');
  return response.data;
};

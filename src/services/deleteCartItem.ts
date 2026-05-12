import api from '@/services/api';

export const deleteCartItem = async ({ cartItem }: { cartItem: { productId: string } }): Promise<void> => {
	await api.delete(`/api/cart-items/${cartItem.productId}`);
};

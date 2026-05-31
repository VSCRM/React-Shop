import api from "@/services/api";

export const updateCartDelivery = async (
	productId: string,
	deliveryOptionId: string,
): Promise<void> => {
	await api.put(`/api/cart-items/${productId}`, { deliveryOptionId });
};

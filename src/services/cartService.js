import axios from "axios";

export const updateCartItemDelivery = async (productId, deliveryOptionId) => {
	return await axios.put(`/api/cart-items/${productId}`, {
		deliveryOptionId
	});
};

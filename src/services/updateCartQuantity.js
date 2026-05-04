import axios from "axios";

export const updateCartQuantity = async (productId, quantity) => {
	return await axios.put(`/api/cart-items/${productId}`, {
		quantity
	});
};

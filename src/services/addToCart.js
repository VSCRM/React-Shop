import axios from "axios";

export const addToCart = async (productId, quantity) => {
	return await axios.post('/api/cart-items', {
		productId,
		quantity
	});
};

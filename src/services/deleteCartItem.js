import axios from "axios"

export const deleteCartItem = async ({ cartItem}) => {
	return await axios.delete(`/api/cart-items/${cartItem.productId}`);
}

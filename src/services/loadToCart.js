import axios from "axios";

export const loadToCart = async () => {
	const response = await axios.get('/api/cart-items?expand=product');
	return (response.data);
};

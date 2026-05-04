import axios from "axios";

export const createOrder = async () => {
	const response = await axios.post('/api/orders');
	return response.data;
};

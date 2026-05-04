import axios from "axios";
import { useState, useEffect } from "react";

export function useDeliveryOptions() {
	const [deliveryOptions, setDeliveryOptions] = useState([]);

	useEffect(() => {
		const fetchDeliveryOptions = async () => {
			const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
			setDeliveryOptions(response.data);
		};
		fetchDeliveryOptions();
	}, []);

	return (
		deliveryOptions
	);
}

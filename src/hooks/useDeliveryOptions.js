import { useState, useEffect } from 'react';
import api from '@/services/api';

export function useDeliveryOptions() {
	const [deliveryOptions, setDeliveryOptions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchDeliveryOptions = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await api.get('/api/delivery-options?expand=estimatedDeliveryTime');
				setDeliveryOptions(response.data);
			} catch {
				setError('Could not load delivery options. Please try again.');
			} finally {
				setLoading(false);
			}
		};
		fetchDeliveryOptions();
	}, []);

	return {
		deliveryOptions, loading, error
	};
}

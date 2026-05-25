import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '@/services/api';

export function useDeliveryOptions() {
	const [deliveryOptions, setDeliveryOptions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const controller = new AbortController();

		const fetchDeliveryOptions = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await api.get(
					'/api/delivery-options?expand=estimatedDeliveryTime',
					{ signal: controller.signal }
				);
				setDeliveryOptions(response.data);
			} catch (err) {
				if (axios.isCancel(err)) return;
				setError('Could not load delivery options. Please try again.');
			} finally {
				if (!controller.signal.aborted) {
					setLoading(false);
				}
			}
		};

		fetchDeliveryOptions();
		return () => controller.abort();
	}, []);

	return {
		deliveryOptions, loading, error
	};
}

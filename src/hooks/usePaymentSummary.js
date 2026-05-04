import axios from 'axios';
import { useState, useEffect } from 'react';

export function usePaymentSummary({cart}) {
	const [paymentSummary, setPaymentSummary] = useState(null);

	useEffect(() => {
		const fetchPaymentSummary = async () => {
			const response = await axios.get('/api/payment-summary');
			setPaymentSummary(response.data);
		};
		fetchPaymentSummary();
	}, [cart]);

	return (
		paymentSummary
	);
}

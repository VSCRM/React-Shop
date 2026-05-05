export function computeStatus(orderTimeMs, estimatedDeliveryTimeMs) {
	const now = Date.now();

	if (now >= estimatedDeliveryTimeMs) {
		return 'Delivered';
	}

	const totalDuration = estimatedDeliveryTimeMs - orderTimeMs;
	const elapsed = now - orderTimeMs;

	if (elapsed < totalDuration * 0.4) {
		return 'Preparing';
	}

	return (
		'Shipped'
	);
}

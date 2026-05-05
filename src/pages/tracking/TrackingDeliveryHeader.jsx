import dayjs from 'dayjs';

export function TrackingDeliveryHeader({ estimatedDeliveryTimeMs, status }) {
	const formattedDate = dayjs(estimatedDeliveryTimeMs).format('dddd, MMMM D');

	const label =
		status === 'Delivered'
			? `Delivered on ${formattedDate}`
			: `Arriving on ${formattedDate}`;

	return (
		<div className="delivery-date">{label}</div>
	);
}

import dayjs from 'dayjs';
import type { TrackingStatus } from '@/types';

interface Props {
	estimatedDeliveryTimeMs: number;
	status: TrackingStatus;
}

export function TrackingDeliveryHeader({ estimatedDeliveryTimeMs, status }: Props) {
	const formattedDate = dayjs(estimatedDeliveryTimeMs).format('dddd, MMMM D');
	const label = status === 'Delivered'
		? `Delivered on ${formattedDate}`
		: `Arriving on ${formattedDate}`;

	return <div className="delivery-date">{label}</div>;
}

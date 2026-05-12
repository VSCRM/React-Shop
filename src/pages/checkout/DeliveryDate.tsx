import dayjs from 'dayjs';
import type { DeliveryOption } from '@/types';

interface Props {
	selectedDeliveryOption: DeliveryOption;
}

export function DeliveryDate({ selectedDeliveryOption }: Props) {
	return (
		<div className="delivery-date">
			Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
		</div>
	);
}

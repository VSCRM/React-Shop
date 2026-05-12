import type { Order } from '@/types';
import { OrderHeader } from './OrderHeader';
import { OrderDetail } from './OrderDetail';

interface Props {
	singleOrder: Order;
	addCart: (productId: string, quantity: number) => Promise<void>;
}

export function OrderContainer({ singleOrder, addCart }: Props) {
	return (
		<div className="order-container">
			<OrderHeader singleOrder={singleOrder} />
			<OrderDetail singleOrder={singleOrder} addCart={addCart} />
		</div>
	);
}

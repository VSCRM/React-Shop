import { OrderHeader } from './OrderHeader';
import { OrderDetail } from './OrderDetail';

export function OrderContainer({ singleOrder, addCart }) {
	return (
		<div className="order-container">
			<OrderHeader singleOrder={singleOrder} />
			<OrderDetail singleOrder={singleOrder} addCart={addCart} />
		</div>
	);
}

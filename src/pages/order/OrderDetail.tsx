import { Fragment } from 'react';
import type { Order } from '@/types';
import { apiImage } from '@/utils/imageUrl';
import { ProductDetails } from './ProductDetails';
import { ProductActions } from './ProductActions';

interface Props {
	singleOrder: Order;
	addCart: (productId: string, quantity: number) => Promise<void>;
}

export function OrderDetail({ singleOrder, addCart }: Props) {
	return (
		<div className="order-details-grid">
			{singleOrder.products.map((orderProduct) => (
				<Fragment key={orderProduct.productId}>
					<div className="product-image-container">
						<img src={apiImage(orderProduct.product.image)} alt={orderProduct.product.name} />
					</div>
					<ProductDetails orderProduct={orderProduct} addCart={addCart} />
					<ProductActions orderId={singleOrder.id} productId={orderProduct.productId} />
				</Fragment>
			))}
		</div>
	);
}

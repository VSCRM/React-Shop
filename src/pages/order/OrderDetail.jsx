import { Fragment } from "react";
import { apiImage } from '@/utils/imageUrl';
import { ProductDetails } from "./ProductDetails";
import { ProductActions } from "./ProductActions";

export function OrderDetail({ singleOrder, addCart }) {
	return (
		<div className="order-details-grid">
			{singleOrder.products.map((orderProduct) => {
				return (
					<Fragment key={orderProduct.productId}>
						<div className="product-image-container">
							<img src={apiImage(orderProduct.product.image)} />
						</div>

						<ProductDetails orderProduct={orderProduct} addCart={addCart} />

						<ProductActions
							orderId={singleOrder.id}
							productId={orderProduct.productId}
						/>
					</Fragment>
				);
			})}
		</div>
	);
}

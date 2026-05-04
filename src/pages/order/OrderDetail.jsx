import { Fragment } from "react";
import { ProductDetails } from "./ProductDetails";
import { ProductActions } from "./ProductActions";

export function OrderDetail({ singleOrder }) {
	return (
		<div className="order-details-grid">
			{singleOrder.products.map((orderProduct) => {
				return (
					<Fragment key={orderProduct.productId}>
						<div className="product-image-container">
							<img src={orderProduct.product.image} />
						</div>

						<ProductDetails orderProduct={orderProduct} />

						<ProductActions />
					</Fragment>
				);
			})}
		</div>
	);
}

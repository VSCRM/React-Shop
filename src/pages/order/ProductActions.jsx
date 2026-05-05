import { Link } from "react-router";

export function ProductActions({ orderId, productId }) {
	return (
		<div className="product-actions">
			<Link to={`/tracking/${orderId}/${productId}`}>
				<button className="track-package-button button-secondary">
					Track package
				</button>
			</Link>
		</div>
	);
}

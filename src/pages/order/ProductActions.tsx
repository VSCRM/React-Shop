import { Link } from "react-router";

interface Props {
	orderId: string;
	productId: string;
}

export function ProductActions({ orderId, productId }: Props) {
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

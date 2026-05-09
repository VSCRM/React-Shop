import { staticImage } from '@/utils/imageUrl';

export function ProductRating({ rating }) {
	return (
		<div className="product-rating-container">
			<img
				className="product-rating-stars"
				src={staticImage(`images/ratings/rating-${rating.stars * 10}.png`)}
				alt="rating stars"
			/>
			<div className="product-rating-count link-primary">
				{rating.count}
			</div>
		</div>
	);
}

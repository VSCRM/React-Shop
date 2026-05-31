import type { Rating } from "@/types";
import { staticImage } from "@/utils/imageUrl";

interface Props {
	rating: Rating;
}

export function ProductRating({ rating }: Props) {
	return (
		<div className="product-rating-container">
			<img
				className="product-rating-stars"
				src={staticImage(`images/ratings/rating-${rating.stars * 10}.png`)}
				alt="rating stars"
			/>
			<div className="product-rating-count link-primary">{rating.count}</div>
		</div>
	);
}

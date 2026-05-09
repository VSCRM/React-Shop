import { staticImage } from '@/utils/imageUrl';

export function AddedMessage({ isAdded, quantity }) {
	return (
		<div className={`added-to-cart ${isAdded ? "is-visible" : ""}`}>
			<img src={staticImage('images/icons/checkmark.png')} alt="added" />
			Added ({quantity})
		</div>
	);
}

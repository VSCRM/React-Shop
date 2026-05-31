import { staticImage } from "@/utils/imageUrl";

interface Props {
	isAdded: boolean;
	quantity: number;
}

export function AddedMessage({ isAdded, quantity }: Props) {
	return (
		<div className={`added-to-cart ${isAdded ? "is-visible" : ""}`}>
			<img src={staticImage("images/icons/checkmark.png")} alt="added" />
			Added ({quantity})
		</div>
	);
}

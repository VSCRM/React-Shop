export function AddedMessage({ isAdded, quantity }) {
	return (
		<div className={`added-to-cart ${isAdded ? "is-visible" : ""}`}>
			<img src="images/icons/checkmark.png" alt="added" />
			Added ({quantity})
		</div>
	);
}

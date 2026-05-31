interface Props {
	quantity: number;
	onUpdate: () => void;
	onDelete: () => void;
}

export function QuantityDisplay({ quantity, onUpdate, onDelete }: Props) {
	return (
		<span>
			Quantity: <span className="quantity-label">{quantity}</span>
			<span className="update-quantity-link link-primary" onClick={onUpdate}>
				Update
			</span>
			<span className="delete-quantity-link link-primary" onClick={onDelete}>
				Delete
			</span>
		</span>
	);
}

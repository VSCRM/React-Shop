interface Props {
	currentQuantity: number;
	onSave: (quantity: number) => void;
	onCancel: () => void;
}

export function QuantityEditor({ currentQuantity, onSave, onCancel }: Props) {
	return (
		<span className="quantity-editor">
			<span>Quantity:</span>
			<select
				className="quantity-editor-select"
				defaultValue={currentQuantity}
				onChange={(event) => onSave(Number(event.target.value))}
			>
				{Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
					<option key={n} value={n}>{n}</option>
				))}
			</select>
			<span className="link-primary" onClick={onCancel}>Cancel</span>
		</span>
	);
}

export function QuantityEditor({ currentQuantity, onSave, onCancel }) {
	return (
		<span className="quantity-editor">
			<span>Quantity:</span>
			<select
				className="quantity-editor-select"
				defaultValue={currentQuantity}
				onChange={(event) => onSave(Number(event.target.value))}
			>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10">10</option>
			</select>
			<span className="link-primary" onClick={onCancel}>
				Cancel
			</span>
		</span>
	);
}

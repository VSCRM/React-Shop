export function BuyAgainPicker({ maxQuantity, selectedQuantity, onSelect, onConfirm, onCancel }) {
	return (
		<div className="buy-again-picker">
			<select
				value={selectedQuantity}
				onChange={(event) => onSelect(Number(event.target.value))}
				className="buy-again-select"
			>
				{Array.from({ length: maxQuantity }, (_, i) => i + 1).map((number) => (
					<option
						key={number}
						value={number}
					>
						{number}
					</option>
				))}
			</select>
			<button className="buy-again-button button-primary" onClick={onConfirm}>
				<img className="buy-again-icon" src="images/icons/buy-again.png" alt="buy" />
				<span className="buy-again-message">Add to Cart</span>
			</button>
			<button className="buy-again-cancel button-secondary" onClick={onCancel}>
				Cancel
			</button>
		</div>
	);
}

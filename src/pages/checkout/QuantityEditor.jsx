import { useState } from 'react';

export function QuantityEditor({ currentQuantity, onSave, onCancel }) {
	const [localQuantity, setLocalQuantity] = useState(currentQuantity);

	return (
		<span className="quantity-editor">
			<span>Quantity:</span>
			<select
				className="quantity-editor-select"
				value={localQuantity}
				onChange={(event) => setLocalQuantity(Number(event.target.value))}
			>
				{Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
					<option key={n} value={n}>{n}</option>
				))}
			</select>
			<span className="link-primary" onClick={() => onSave(localQuantity)}>
				Save
			</span>
			<span className="link-primary" onClick={onCancel}>
				Cancel
			</span>
		</span>
	);
}

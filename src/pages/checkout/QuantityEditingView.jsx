import { QuantityEditor } from "./QuantityEditor";

export function QuantityEditingView({ quantity, onSave, onCancel }) {
	return (
		<div className="product-quantity">
			<QuantityEditor
				currentQuantity={quantity}
				onSave={onSave}
				onCancel={onCancel}
			/>
		</div>
	);
}

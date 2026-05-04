import { DeleteConfirm } from "./DeleteConfirm";

export function QuantityConfirmDeleteView({ quantity, onDeleteOne, onDeleteAll, onCancel }) {
	return (
		<div className="product-quantity">
			<DeleteConfirm
				quantity={quantity}
				onDeleteOne={quantity > 1 ? onDeleteOne : null}
				onDeleteAll={onDeleteAll}
				onCancel={onCancel}
			/>
		</div>
	);
}

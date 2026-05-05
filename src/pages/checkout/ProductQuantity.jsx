import { QuantityDisplay } from "./QuantityDisplay";
import { QuantityEditingView } from "./QuantityEditingView";
import { QuantityConfirmDeleteView } from "./QuantityConfirmDeleteView";
import { useQuantityMode } from "../../hooks/useQuantityMode";

export function ProductQuantity({ cartItem, removeItem, updateQuantity }) {
	const {
		mode, setMode,
		handleSave, handleDeleteOne, handleDeleteAll
	} = useQuantityMode(cartItem, removeItem, updateQuantity);

	return (
		<>
			{mode === "view" && (
				<div className="product-quantity">
					<QuantityDisplay
						quantity={cartItem.quantity}
						onUpdate={() => setMode("edit")}
						onDelete={() => setMode("delete")}
					/>
				</div>
			)}

			{mode === "edit" && (
				<QuantityEditingView
					quantity={cartItem.quantity}
					onSave={handleSave}
					onCancel={() => setMode("view")}
				/>
			)}

			{mode === "delete" && (
				<QuantityConfirmDeleteView
					quantity={cartItem.quantity}
					onDeleteOne={handleDeleteOne}
					onDeleteAll={handleDeleteAll}
					onCancel={() => setMode("view")}
				/>
			)}
		</>
	);
}

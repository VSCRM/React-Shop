import { useState } from "react";
import { QuantityDisplay } from "./QuantityDisplay";
import { QuantityEditingView } from "./QuantityEditingView";
import { QuantityConfirmDeleteView } from "./QuantityConfirmDeleteView";

export function ProductQuantity({ cartItem, removeItem, updateQuantity }) {
	const [mode, setMode] = useState("view");

	const handleSave = async (newQuantity) => {
		await updateQuantity(cartItem.productId, newQuantity);
		setMode("view");
	};

	const handleDeleteOne = async () => {
		if (cartItem.quantity === 1) {
			await removeItem(cartItem.productId);
		} else {
			await updateQuantity(cartItem.productId, cartItem.quantity - 1);
			setMode("view");
		}
	};

	const handleDeleteAll = async () => {
		await removeItem(cartItem.productId);
	};

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

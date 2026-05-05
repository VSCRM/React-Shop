import { useState } from "react";

export function useQuantityMode(cartItem, removeItem, updateQuantity) {
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

	return {
		mode,
		setMode,
		handleSave,
		handleDeleteOne,
		handleDeleteAll
	};
}

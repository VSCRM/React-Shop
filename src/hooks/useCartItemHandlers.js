import { useState } from 'react';

export function useCartItemHandlers(cartItem, updateQuantity, removeItem) {
	const [isEditing, setIsEditing] = useState(false);
	const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

	const handleSaveQuantity = async (newQuantity) => {
		await updateQuantity(cartItem.productId, newQuantity);
		setIsEditing(false);
	};

	const handleDeleteOne = async () => {
		if (cartItem.quantity === 1) {
			await removeItem(cartItem.productId);
		} else {
			await updateQuantity(cartItem.productId, cartItem.quantity - 1);
		}
		setIsConfirmingDelete(false);
	};

	const handleDeleteAll = async () => {
		await removeItem(cartItem.productId);
	};

	return {
		isEditing,
		setIsEditing,
		isConfirmingDelete,
		setIsConfirmingDelete,
		handleSaveQuantity,
		handleDeleteOne,
		handleDeleteAll,
	};
}

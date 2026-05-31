import { useState } from "react";

interface CartItemLike {
	productId: string;
	quantity: number;
}

export function useCartItemHandlers(
	cartItem: CartItemLike,
	updateQuantity: (productId: string, quantity: number) => Promise<void> | void,
	removeItem: (productId: string) => Promise<void> | void,
) {
	const [isEditing, setIsEditing] = useState(false);
	const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

	const handleSaveQuantity = async (newQuantity: number): Promise<void> => {
		await updateQuantity(cartItem.productId, newQuantity);
		setIsEditing(false);
	};

	const handleDeleteOne = async (): Promise<void> => {
		if (cartItem.quantity === 1) {
			await removeItem(cartItem.productId);
		} else {
			await updateQuantity(cartItem.productId, cartItem.quantity - 1);
		}
		setIsConfirmingDelete(false);
	};

	const handleDeleteAll = async (): Promise<void> => {
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

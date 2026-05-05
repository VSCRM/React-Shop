import { useState } from "react";

export function useBuyAgain(orderProduct, addCart, onAdded) {
	const [showPicker, setShowPicker] = useState(false);
	const [selectedQuantity, setSelectedQuantity] = useState(1);

	const handleAddToCart = () => {
		if (orderProduct.quantity === 1) {
			addCart(orderProduct.productId, 1);
			onAdded();
		} else {
			setShowPicker(true);
		}
	};

	const handleConfirm = () => {
		addCart(orderProduct.productId, selectedQuantity);
		setShowPicker(false);
		setSelectedQuantity(1);
		onAdded();
	};

	const handleCancel = () => setShowPicker(false);

	return {
		showPicker,
		selectedQuantity,
		setSelectedQuantity,
		handleAddToCart,
		handleConfirm,
		handleCancel
	};
}

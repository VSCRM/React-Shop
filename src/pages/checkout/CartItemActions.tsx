import type { CartItem } from "@/types";
import type { useCartItemHandlers } from "@/hooks/useCartItemHandlers";
import { QuantityEditor } from "./QuantityEditor";
import { DeleteConfirm } from "./DeleteConfirm";
import { QuantityDisplay } from "./QuantityDisplay";

type Handlers = ReturnType<typeof useCartItemHandlers>;

interface Props {
	cartItem: CartItem;
	handlers: Handlers;
}

export function CartItemActions({ cartItem, handlers }: Props) {
	const {
		isEditing,
		setIsEditing,
		isConfirmingDelete,
		setIsConfirmingDelete,
		handleSaveQuantity,
		handleDeleteOne,
		handleDeleteAll,
	} = handlers;

	if (isEditing) {
		return (
			<QuantityEditor
				currentQuantity={cartItem.quantity}
				onSave={handleSaveQuantity}
				onCancel={() => setIsEditing(false)}
			/>
		);
	}

	if (isConfirmingDelete) {
		return (
			<DeleteConfirm
				quantity={cartItem.quantity === 1 ? undefined : cartItem.quantity}
				onDeleteOne={cartItem.quantity === 1 ? undefined : handleDeleteOne}
				onDeleteAll={handleDeleteAll}
				onCancel={() => setIsConfirmingDelete(false)}
			/>
		);
	}

	return (
		<QuantityDisplay
			quantity={cartItem.quantity}
			onUpdate={() => setIsEditing(true)}
			onDelete={() => setIsConfirmingDelete(true)}
		/>
	);
}

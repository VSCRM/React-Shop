import { useState } from "react";
import { formatMoney } from "../../utils/money";
import { DeleteConfirm } from "./DeleteConfirm";
import { DeliveryOptions } from "./DeliveryOptions";
import { QuantityEditor } from "./QuantityEditor";

export function CartItemDetails({
	cartItem, deliveryOptions, updateDeliveryOption, removeItem, updateQuantity
}) {
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

	return (
		<div className="cart-item-details-grid">
			<img className="product-image" src={cartItem.product.image} />

			<div className="cart-item-details">
				<div className="product-name">
					{cartItem.product.name}
				</div>
				<div className="product-price">
					{formatMoney(cartItem.product.priceCents)}
				</div>

				<div className="product-quantity">
					{isEditing ? (
						<QuantityEditor
							currentQuantity={cartItem.quantity}
							onSave={handleSaveQuantity}
							onCancel={() => setIsEditing(false)}
						/>
					) : isConfirmingDelete ? (
						cartItem.quantity === 1 ? (
							<DeleteConfirm
								onDeleteAll={handleDeleteAll}
								onCancel={() => setIsConfirmingDelete(false)}
							/>
						) : (
							<DeleteConfirm
								quantity={cartItem.quantity}
								onDeleteOne={handleDeleteOne}
								onDeleteAll={handleDeleteAll}
								onCancel={() => setIsConfirmingDelete(false)}
							/>
						)
					) : (
						<span>
							Quantity: <span className="quantity-label">{cartItem.quantity}</span>
							<span
								className="update-quantity-link link-primary"
								onClick={() => setIsEditing(true)}
							>
								Update
							</span>
							<span
								className="delete-quantity-link link-primary"
								onClick={() => setIsConfirmingDelete(true)}
							>
								Delete
							</span>
						</span>
					)}
				</div>
			</div>

			<DeliveryOptions
				deliveryOptions={deliveryOptions}
				cartItem={cartItem}
				updateDeliveryOption={updateDeliveryOption}
			/>
		</div>
	);
}

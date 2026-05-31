interface Props {
	quantity?: number;
	onDeleteOne?: () => void;
	onDeleteAll: () => void;
	onCancel: () => void;
}

export function DeleteConfirm({
	quantity,
	onDeleteOne,
	onDeleteAll,
	onCancel,
}: Props) {
	return (
		<span className="delete-confirm">
			<span className="delete-confirm-label">Delete</span>
			{quantity && quantity > 1 && (
				<>
					<span className="link-primary" onClick={onDeleteOne}>
						1 item
					</span>
					<span className="delete-confirm-separator">|</span>
					<span
						className="link-primary delete-confirm-all"
						onClick={onDeleteAll}
					>
						All ({quantity} items)
					</span>
				</>
			)}
			{(!quantity || quantity === 1) && (
				<span className="link-primary delete-confirm-all" onClick={onDeleteAll}>
					Yes
				</span>
			)}
			<span className="link-primary delete-confirm-cancel" onClick={onCancel}>
				Cancel
			</span>
		</span>
	);
}

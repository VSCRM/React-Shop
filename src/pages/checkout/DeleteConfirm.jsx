export function DeleteConfirm({ quantity, onDeleteOne, onDeleteAll, onCancel }) {
	return (
		<span className="delete-confirm">
			<span className="delete-confirm-label">Delete</span>
			{quantity > 1 && (
				<>
					<span className="link-primary" onClick={onDeleteOne}>
						1 item
					</span>
					<span className="delete-confirm-separator">|</span>
					<span className="link-primary delete-confirm-all" onClick={onDeleteAll}>
						All ({quantity} items)
					</span>
				</>
			)}
			{quantity === 1 || !quantity ? (
				<span className="link-primary delete-confirm-all" onClick={onDeleteAll}>
					Yes
				</span>
			) : null}
			<span className="link-primary delete-confirm-cancel" onClick={onCancel}>
				Cancel
			</span>
		</span>
	);
}

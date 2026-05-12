import type { Dispatch, SetStateAction } from 'react';
import { staticImage } from '@/utils/imageUrl';

interface Props {
	maxQuantity: number;
	selectedQuantity: number;
	onSelect: Dispatch<SetStateAction<number>>;
	onConfirm: () => void;
	onCancel: () => void;
}

export function BuyAgainPicker({ maxQuantity, selectedQuantity, onSelect, onConfirm, onCancel }: Props) {
	return (
		<div className="buy-again-picker">
			<select
				value={selectedQuantity}
				onChange={(event) => onSelect(Number(event.target.value))}
				className="buy-again-select"
			>
				{Array.from({ length: maxQuantity }, (_, i) => i + 1).map((n) => (
					<option key={n} value={n}>{n}</option>
				))}
			</select>
			<button className="buy-again-button button-primary" onClick={onConfirm}>
				<img className="buy-again-icon" src={staticImage('images/icons/buy-again.png')} alt="buy" />
				<span className="buy-again-message">Add to Cart</span>
			</button>
			<button className="buy-again-cancel button-secondary" onClick={onCancel}>Cancel</button>
		</div>
	);
}

import type { Dispatch, SetStateAction } from 'react';

interface Props {
	selectedQuantity: number;
	setSelectedQuantity: Dispatch<SetStateAction<number>>;
}

export function ProductQuantity({ selectedQuantity, setSelectedQuantity }: Props) {
	return (
		<div className="product-quantity-container">
			<select
				value={selectedQuantity}
				onChange={(event) => setSelectedQuantity(Number(event.target.value))}
			>
				{Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
					<option key={n} value={n}>{n}</option>
				))}
			</select>
		</div>
	);
}

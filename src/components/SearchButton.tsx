import { staticImage } from '@/utils/imageUrl';

interface Props {
	hasText: boolean;
	onClear: () => void;
}

export function SearchButton({ hasText, onClear }: Props) {
	if (hasText) {
		return (
			<button type="button" className="search-button" onClick={onClear}>
				✕
			</button>
		);
	}

	return (
		<button type="submit" className="search-button">
			<img className="search-icon" src={staticImage('images/icons/search-icon.png')} alt="search" />
		</button>
	);
}

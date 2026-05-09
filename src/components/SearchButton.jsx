import { staticImage } from '@/utils/imageUrl';

export function SearchButton({ hasText, onClear }) {
	return (
		<button
			type={hasText ? 'button' : 'submit'}
			className="search-button"
			onClick={hasText ? onClear : undefined}
			title={hasText ? 'Clear search' : 'Search'}
		>
			<img
				className="search-icon"
				src={staticImage('images/icons/search-icon.png')}
			/>
		</button>
	);
}

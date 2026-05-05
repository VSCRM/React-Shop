export function NoSearchResults({ searchQuery }) {
	return (
		<div className="no-results">
			No products found for &ldquo;{searchQuery}&rdquo;
		</div>
	);
}

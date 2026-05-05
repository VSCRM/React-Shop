export function SearchInput({ value, onChange }) {
	return (
		<input
			className="search-bar"
			type="text"
			placeholder="Search"
			value={value}
			onChange={onChange}
		/>
	);
}

import type { ChangeEvent } from 'react';

interface Props {
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({ value, onChange }: Props) {
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

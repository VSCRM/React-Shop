import { SearchInput } from './SearchInput';
import { SearchButton } from './SearchButton';
import { useHeaderSearch } from '@/hooks/useHeaderSearch';

export function HeaderSearch() {
	const {
		searchInputValue,
		hasText,
		handleInputChange,
		handleFormSubmit,
		handleClearSearch,
	} = useHeaderSearch();

	return (
		<form className="middle-section" onSubmit={handleFormSubmit}>
			<SearchInput value={searchInputValue} onChange={handleInputChange} />
			<SearchButton hasText={hasText} onClear={handleClearSearch} />
		</form>
	);
}

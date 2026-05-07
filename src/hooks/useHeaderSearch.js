import { useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router';
import { SEARCH_URL_KEY } from '@/utils/constants';
import { buildSearchPath } from '@/utils/searchUtils';

export function useHeaderSearch() {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchInputValue, setSearchInputValue] = useState('');

	const isOnHomePage = location.pathname === '/';
	const searchQueryFromUrl = searchParams.get(SEARCH_URL_KEY) ?? '';
	const displayValue = isOnHomePage ? searchQueryFromUrl : searchInputValue;

	const handleHomeSearch = (value) => {
		setSearchParams(value ? { [SEARCH_URL_KEY]: value } : {}, { replace: true });
	};

	const handleOtherSearch = (value) => {
		setSearchInputValue(value);
	};

	const handleInputChange = (event) => {
		const value = event.target.value;
		isOnHomePage ? handleHomeSearch(value) : handleOtherSearch(value);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		if (!isOnHomePage) {
			navigate(buildSearchPath(searchInputValue));
		}
	};

	const handleClearSearch = () => {
		isOnHomePage ? handleHomeSearch('') : handleOtherSearch('');
	};

	return {
		searchInputValue: displayValue,
		hasText: displayValue.length > 0,
		handleInputChange,
		handleFormSubmit,
		handleClearSearch,
	};
}

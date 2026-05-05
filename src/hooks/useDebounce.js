import { useState, useEffect } from 'react';

export function useDebounce(rawValue, delayMs = 350) {
	const [stableValue, setStableValue] = useState(rawValue);

	useEffect(() => {
		const debounceTimer = setTimeout(() => {
			setStableValue(rawValue);
		}, delayMs);

		return () => clearTimeout(debounceTimer);
	}, [rawValue, delayMs]);

	return (
		stableValue
	);
}

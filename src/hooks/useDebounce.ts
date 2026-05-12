import { useState, useEffect } from 'react';

export function useDebounce<T>(rawValue: T, delayMs = 350): T {
	const [stableValue, setStableValue] = useState<T>(rawValue);

	useEffect(() => {
		const debounceTimer = setTimeout(() => {
			setStableValue(rawValue);
		}, delayMs);

		return () => clearTimeout(debounceTimer);
	}, [rawValue, delayMs]);

	return stableValue;
}

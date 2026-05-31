import { SEARCH_URL_KEY } from "./constants";

export const buildSearchPath = (value: string): string => {
	const trimmed = value.trim();
	return trimmed ? `/?${SEARCH_URL_KEY}=${encodeURIComponent(trimmed)}` : "/";
};

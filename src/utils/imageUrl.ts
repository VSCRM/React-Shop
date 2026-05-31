export const apiImage = (path: string): string =>
	`${import.meta.env.VITE_API_URL}/${path}`;

export const staticImage = (path: string): string =>
	`${import.meta.env.BASE_URL}${path}`;

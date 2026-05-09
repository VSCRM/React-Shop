export const apiImage = (path) =>
	`${import.meta.env.VITE_API_URL}/${path}`;

export const staticImage = (path) =>
	`${import.meta.env.BASE_URL}${path}`;

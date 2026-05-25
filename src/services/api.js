import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? '',
	timeout: 10_000,
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (axios.isCancel(error)) return Promise.reject(error);
		const status = error.response?.status;
		if (status === 401) {
			console.warn('[api] Unauthorized');
		} else if (status >= 500) {
			console.error('[api] Server error', error.response?.data);
		}
		return Promise.reject(error);
	}
);

export default api;

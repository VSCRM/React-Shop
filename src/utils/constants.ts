import type { TrackingStatus } from '@/types';

export const SEARCH_URL_KEY = 'q';
export const DEBOUNCE_DELAY_MS = 350;
export const TRACKING_STEPS: TrackingStatus[] = ['Preparing', 'Shipped', 'Delivered'];
export const PROGRESS_MAP: Record<TrackingStatus, string> = {
	Preparing: '0%',
	Shipped: '50%',
	Delivered: '100%',
};

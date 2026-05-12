import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useDeliveryOptions } from './useDeliveryOptions';

vi.mock('@/services/api', () => ({
  default: { get: vi.fn() },
}));

import api from '@/services/api';

const OPTIONS_STUB = [
  { id: '1', deliveryDays: 7, priceCents: 0 },
  { id: '2', deliveryDays: 3, priceCents: 499 },
  { id: '3', deliveryDays: 1, priceCents: 999 },
];

beforeEach(() => vi.clearAllMocks());

describe('useDeliveryOptions', () => {
  describe('successful fetch', () => {
    it('returns delivery options after load', async () => {
      vi.mocked(api.get).mockResolvedValue({ data: OPTIONS_STUB });
      const { result } = renderHook(() => useDeliveryOptions());

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.deliveryOptions).toEqual(OPTIONS_STUB);
      expect(result.current.error).toBeNull();
    });

    it('calls GET /api/delivery-options with estimatedDeliveryTime expand param', async () => {
      vi.mocked(api.get).mockResolvedValue({ data: OPTIONS_STUB });
      renderHook(() => useDeliveryOptions());

      await waitFor(() => {});

      expect(api.get).toHaveBeenCalledWith('/api/delivery-options?expand=estimatedDeliveryTime');
    });
  });

  describe('loading state', () => {
    it('starts in loading state', () => {
      vi.mocked(api.get).mockResolvedValue({ data: OPTIONS_STUB });
      const { result } = renderHook(() => useDeliveryOptions());
      expect(result.current.loading).toBe(true);
    });

    it('sets loading to false after successful fetch', async () => {
      vi.mocked(api.get).mockResolvedValue({ data: OPTIONS_STUB });
      const { result } = renderHook(() => useDeliveryOptions());

      await waitFor(() => expect(result.current.loading).toBe(false));
    });

    it('sets loading to false even after a failed fetch', async () => {
      vi.mocked(api.get).mockRejectedValue(new Error('Network'));
      const { result } = renderHook(() => useDeliveryOptions());

      await waitFor(() => expect(result.current.loading).toBe(false));
    });
  });

  describe('error handling', () => {
    it('sets an error message when the request fails', async () => {
      vi.mocked(api.get).mockRejectedValue(new Error('Network'));
      const { result } = renderHook(() => useDeliveryOptions());

      await waitFor(() => {
        expect(result.current.error).toBe('Could not load delivery options. Please try again.');
      });
    });

    it('leaves deliveryOptions empty on failure', async () => {
      vi.mocked(api.get).mockRejectedValue(new Error('Network'));
      const { result } = renderHook(() => useDeliveryOptions());

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.deliveryOptions).toEqual([]);
    });
  });
});

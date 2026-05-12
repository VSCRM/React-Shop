import { describe, it, expect, vi, afterEach } from 'vitest';
import { computeStatus } from './computeStatus';

afterEach(() => { vi.restoreAllMocks(); });

describe('computeStatus', () => {
  const freeze = (ms: number) => vi.spyOn(Date, 'now').mockReturnValue(ms);

  describe('Delivered', () => {
    it('returns "Delivered" when current time equals estimated delivery', () => {
      freeze(2000);
      expect(computeStatus(1000, 2000)).toBe('Delivered');
    });

    it('returns "Delivered" when current time is past estimated delivery', () => {
      freeze(9999);
      expect(computeStatus(1000, 2000)).toBe('Delivered');
    });
  });

  describe('Preparing', () => {
    it('returns "Preparing" when less than 40% of duration has elapsed', () => {
      freeze(3900);
      expect(computeStatus(0, 10000)).toBe('Preparing');
    });

    it('returns "Preparing" right after the order was placed', () => {
      freeze(100);
      expect(computeStatus(0, 10000)).toBe('Preparing');
    });
  });

  describe('Shipped', () => {
    it('returns "Shipped" when between 40% and 100% of duration has elapsed', () => {
      freeze(5000);
      expect(computeStatus(0, 10000)).toBe('Shipped');
    });

    it('returns "Shipped" at exactly 40% elapsed', () => {
      freeze(4000);
      expect(computeStatus(0, 10000)).toBe('Shipped');
    });

    it('returns "Shipped" at 99% elapsed (just before delivery)', () => {
      freeze(9999);
      expect(computeStatus(0, 10000)).toBe('Shipped');
    });
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFlashMessage } from './useFlashMessage';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('useFlashMessage', () => {
	it('starts as inactive', () => {
		const { result } = renderHook(() => useFlashMessage());
		const [active] = result.current;
		expect(active).toBe(false);
	});

	it('becomes active immediately after trigger() is called', () => {
		const { result } = renderHook(() => useFlashMessage(2000));
		act(() => result.current[1]());
		expect(result.current[0]).toBe(true);
	});

	it('deactivates after the duration has elapsed', () => {
		const { result } = renderHook(() => useFlashMessage(2000));

		act(() => result.current[1]());
		act(() => vi.advanceTimersByTime(2000));

		expect(result.current[0]).toBe(false);
	});

	it('stays active before the duration elapses', () => {
		const { result } = renderHook(() => useFlashMessage(2000));

		act(() => result.current[1]());
		act(() => vi.advanceTimersByTime(1999));

		expect(result.current[0]).toBe(true);
	});

	it('resets the timer when trigger() is called again while already active', () => {
		const { result } = renderHook(() => useFlashMessage(2000));

		act(() => result.current[1]());
		act(() => vi.advanceTimersByTime(1500));

		// Trigger again — timer should restart from 0
		act(() => result.current[1]());
		act(() => vi.advanceTimersByTime(1500));

		// Still active because the second call extended the timer
		expect(result.current[0]).toBe(true);
	});

	it('uses 2000ms as default duration', () => {
		const { result } = renderHook(() => useFlashMessage());

		act(() => result.current[1]());
		act(() => vi.advanceTimersByTime(1999));
		expect(result.current[0]).toBe(true);

		act(() => vi.advanceTimersByTime(1));
		expect(result.current[0]).toBe(false);
	});
});

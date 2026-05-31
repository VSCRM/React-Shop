import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe("useDebounce", () => {
	it("returns the initial value immediately", () => {
		const { result } = renderHook(() => useDebounce("hello", 300));
		expect(result.current).toBe("hello");
	});

	it("does not update the value before the delay elapses", () => {
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 300),
			{ initialProps: { value: "a" } },
		);

		rerender({ value: "b" });
		act(() => vi.advanceTimersByTime(299));

		expect(result.current).toBe("a");
	});

	it("updates the value after the delay has elapsed", () => {
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 300),
			{ initialProps: { value: "a" } },
		);

		rerender({ value: "b" });
		act(() => vi.advanceTimersByTime(300));

		expect(result.current).toBe("b");
	});

	it("resets the timer on rapid changes (only last value wins)", () => {
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 300),
			{ initialProps: { value: "a" } },
		);

		rerender({ value: "b" });
		act(() => vi.advanceTimersByTime(100));

		rerender({ value: "c" });
		act(() => vi.advanceTimersByTime(300));

		expect(result.current).toBe("c");
	});

	it("uses 350ms as the default delay", () => {
		const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
			initialProps: { value: "initial" },
		});

		rerender({ value: "updated" });
		act(() => vi.advanceTimersByTime(349));
		expect(result.current).toBe("initial");

		act(() => vi.advanceTimersByTime(1));
		expect(result.current).toBe("updated");
	});
});

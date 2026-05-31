import { describe, it, expect, vi } from "vitest";
import type { ReactNode, ChangeEvent, FormEvent } from "react";
import { renderHook, act } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { useHeaderSearch } from "./useHeaderSearch";

const makeHook = (initialPath = "/") => {
	const wrapper = ({ children }: { children: ReactNode }) => (
		<MemoryRouter initialEntries={[initialPath]}>{children}</MemoryRouter>
	);
	return renderHook(() => useHeaderSearch(), { wrapper });
};

const mockInputEvent = (value: string) =>
	({ target: { value } }) as unknown as ChangeEvent<HTMLInputElement>;

const mockSubmitEvent = () =>
	({ preventDefault: vi.fn() }) as unknown as FormEvent<HTMLFormElement>;

describe("useHeaderSearch", () => {
	describe("initial state", () => {
		it("searchInputValue is empty on the home page", () => {
			const { result } = makeHook("/");
			expect(result.current.searchInputValue).toBe("");
		});

		it("hasText is false initially", () => {
			const { result } = makeHook("/");
			expect(result.current.hasText).toBe(false);
		});

		it("reads the query param from the URL on the home page", () => {
			const { result } = makeHook("/?q=shoes");
			expect(result.current.searchInputValue).toBe("shoes");
			expect(result.current.hasText).toBe(true);
		});
	});

	describe("handleInputChange — home page", () => {
		it("updates the search value", () => {
			const { result } = makeHook("/");
			act(() => {
				result.current.handleInputChange(mockInputEvent("socks"));
			});
			expect(result.current.searchInputValue).toBe("socks");
		});

		it("sets hasText to true when value is non-empty", () => {
			const { result } = makeHook("/");
			act(() => {
				result.current.handleInputChange(mockInputEvent("hello"));
			});
			expect(result.current.hasText).toBe(true);
		});

		it("sets hasText to false when value is cleared", () => {
			const { result } = makeHook("/?q=shoes");
			act(() => {
				result.current.handleInputChange(mockInputEvent(""));
			});
			expect(result.current.hasText).toBe(false);
		});
	});

	describe("handleClearSearch", () => {
		it("clears searchInputValue on the home page", () => {
			const { result } = makeHook("/?q=shirts");
			act(() => result.current.handleClearSearch());
			expect(result.current.searchInputValue).toBe("");
		});

		it("clears searchInputValue on other pages", () => {
			const { result } = makeHook("/orders");
			act(() => {
				result.current.handleInputChange(mockInputEvent("pants"));
			});
			act(() => result.current.handleClearSearch());
			expect(result.current.searchInputValue).toBe("");
		});
	});

	describe("handleFormSubmit", () => {
		it("prevents default on form submit", () => {
			const { result } = makeHook("/orders");
			const event = mockSubmitEvent();
			act(() => result.current.handleFormSubmit(event));
			expect(event.preventDefault).toHaveBeenCalled();
		});

		it("does not throw when submitted on the home page", () => {
			const { result } = makeHook("/");
			expect(() =>
				act(() => result.current.handleFormSubmit(mockSubmitEvent())),
			).not.toThrow();
		});
	});
});

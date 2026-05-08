import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { useHeaderSearch } from './useHeaderSearch';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Renders useHeaderSearch inside a MemoryRouter with an optional initial path.
 */
const makeHook = (initialPath = '/') => {
	const wrapper = ({ children }) => (
		<MemoryRouter initialEntries={[initialPath]}>{children}</MemoryRouter>
	);
	return renderHook(() => useHeaderSearch(), { wrapper });
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('useHeaderSearch', () => {
	describe('initial state', () => {
		it('searchInputValue is empty on the home page', () => {
			const { result } = makeHook('/');
			expect(result.current.searchInputValue).toBe('');
		});

		it('hasText is false initially', () => {
			const { result } = makeHook('/');
			expect(result.current.hasText).toBe(false);
		});

		it('reads the query param from the URL on the home page', () => {
			const { result } = makeHook('/?q=shoes');
			expect(result.current.searchInputValue).toBe('shoes');
			expect(result.current.hasText).toBe(true);
		});
	});

	describe('handleInputChange — home page', () => {
		it('updates the search value', () => {
			const { result } = makeHook('/');
			act(() => {
				result.current.handleInputChange({ target: { value: 'socks' } });
			});
			expect(result.current.searchInputValue).toBe('socks');
		});

		it('sets hasText to true when value is non-empty', () => {
			const { result } = makeHook('/');
			act(() => {
				result.current.handleInputChange({ target: { value: 'hello' } });
			});
			expect(result.current.hasText).toBe(true);
		});

		it('sets hasText to false when value is cleared', () => {
			const { result } = makeHook('/?q=shoes');
			act(() => {
				result.current.handleInputChange({ target: { value: '' } });
			});
			expect(result.current.hasText).toBe(false);
		});
	});

	describe('handleClearSearch', () => {
		it('clears searchInputValue on the home page', () => {
			const { result } = makeHook('/?q=shirts');
			act(() => result.current.handleClearSearch());
			expect(result.current.searchInputValue).toBe('');
		});

		it('clears searchInputValue on other pages', () => {
			const { result } = makeHook('/orders');
			act(() => result.current.handleInputChange({ target: { value: 'pants' } }));
			act(() => result.current.handleClearSearch());
			expect(result.current.searchInputValue).toBe('');
		});
	});

	describe('handleFormSubmit', () => {
		it('prevents default on form submit', () => {
			const { result } = makeHook('/orders');
			const event = { preventDefault: vi.fn() };
			act(() => result.current.handleFormSubmit(event));
			expect(event.preventDefault).toHaveBeenCalled();
		});

		it('does not throw when submitted on the home page', () => {
			const { result } = makeHook('/');
			const event = { preventDefault: vi.fn() };
			expect(() =>
				act(() => result.current.handleFormSubmit(event))
			).not.toThrow();
		});
	});
});

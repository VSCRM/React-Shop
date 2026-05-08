import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const mockProduct = {
	id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
	image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
	name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
	rating: { stars: 4.5, count: 87 },
	priceCents: 1090,
	keywords: ['socks', 'sports', 'apparel'],
};

const renderCard = (overrides = {}) => {
	const addCart = vi.fn();
	const props = { product: mockProduct, addCart, ...overrides };
	const utils = render(<ProductCard {...props} />);
	return { ...utils, addCart };
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('ProductCard', () => {
	describe('rendering', () => {
		it('displays the product name', () => {
			renderCard();
			expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
		});

		it('displays the formatted price', () => {
			renderCard();
			expect(screen.getByText('$10.90')).toBeInTheDocument();
		});

		it('renders the product image with correct src and alt', () => {
			renderCard();
			const img = screen.getByRole('img', { name: mockProduct.name });
			expect(img).toHaveAttribute('src', mockProduct.image);
			expect(img).toHaveAttribute('alt', mockProduct.name);
		});

		it('renders the "Add to Cart" button', () => {
			renderCard();
			expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
		});

		it('shows quantity selector defaulting to 1', () => {
			renderCard();
			expect(screen.getByDisplayValue('1')).toBeInTheDocument();
		});
	});

	describe('add to cart interaction', () => {
		it('calls addCart with the product id and default quantity 1', () => {
			const { addCart } = renderCard();
			fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
			expect(addCart).toHaveBeenCalledWith(mockProduct.id, 1);
		});

		it('calls addCart once per click', () => {
			const { addCart } = renderCard();
			fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
			expect(addCart).toHaveBeenCalledTimes(1);
		});

		it('calls addCart with updated quantity when user changes the selector', () => {
			const { addCart } = renderCard();
			fireEvent.change(screen.getByDisplayValue('1'), { target: { value: '3' } });
			fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
			expect(addCart).toHaveBeenCalledWith(mockProduct.id, 3);
		});

		it('shows "Added" flash message after clicking Add to Cart', () => {
			renderCard();
			fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
			expect(screen.getByText(/added/i)).toBeInTheDocument();
		});
	});

	describe('different price values', () => {
		it('formats a whole-dollar price correctly', () => {
			renderCard({ product: { ...mockProduct, priceCents: 500 } });
			expect(screen.getByText('$5.00')).toBeInTheDocument();
		});

		it('formats a high price correctly', () => {
			renderCard({ product: { ...mockProduct, priceCents: 99999 } });
			expect(screen.getByText('$999.99')).toBeInTheDocument();
		});
	});
});

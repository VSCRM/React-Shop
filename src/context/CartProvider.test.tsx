import { describe, it, expect, vi } from 'vitest';
import type { ReactNode } from 'react';
import type { CartContextValue } from '@/types';
import { render, screen, waitFor } from '@testing-library/react';
import { CartProvider } from './CartProvider';
import { useCartContext } from '@/hooks/useCartContext';
import { MemoryRouter } from 'react-router';

vi.mock('@/services/loadToCart', () => ({
  loadToCart: vi.fn().mockResolvedValue([
    { productId: 'p1', quantity: 2, deliveryOptionId: '1', product: { name: 'Socks', priceCents: 1090 } },
  ]),
}));

const CartConsumer = () => {
  const { cart } = useCartContext();
  return (
    <ul>
      {cart.map((item) => (
        <li key={item.productId}>{item.productId}</li>
      ))}
    </ul>
  );
};

const renderProvider = (ui: ReactNode) =>
  render(
    <MemoryRouter>
      <CartProvider>{ui}</CartProvider>
    </MemoryRouter>
  );

describe('CartProvider', () => {
  it('provides cart data to consumers after initial load', async () => {
    renderProvider(<CartConsumer />);
    await waitFor(() => {
      expect(screen.getByText('p1')).toBeInTheDocument();
    });
  });

  it('exposes the required context shape', async () => {
    let capturedContext: CartContextValue | undefined;

    const ContextInspector = () => {
      capturedContext = useCartContext();
      return null;
    };

    renderProvider(<ContextInspector />);

    await waitFor(() => {
      expect(capturedContext).toMatchObject({
        cart: expect.any(Array),
        loadCart: expect.any(Function),
        addCart: expect.any(Function),
        updateDeliveryOption: expect.any(Function),
        updateQuantity: expect.any(Function),
        removeItem: expect.any(Function),
        placeOrder: expect.any(Function),
      });
    });
  });

  it('renders children without crashing', () => {
    renderProvider(<p>Child content</p>);
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});

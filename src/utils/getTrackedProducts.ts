import type { OrderProduct } from '@/types';

interface OrderLike {
  products?: OrderProduct[];
}

export const getTrackedProducts = (
  order: OrderLike | null | undefined,
  productId?: string
): OrderProduct[] => {
  if (!order || !order.products) return [];
  return productId
    ? order.products.filter((p) => p.productId === productId)
    : order.products;
};

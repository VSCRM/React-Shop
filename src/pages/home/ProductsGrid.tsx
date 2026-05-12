import type { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface Props {
	products: Product[];
	addCart: (productId: string, quantity: number) => Promise<void>;
}

export function ProductsGrid({ products, addCart }: Props) {
	return (
		<div className="products-grid">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} addCart={addCart} />
			))}
		</div>
	);
}

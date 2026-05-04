import { ProductCard } from "./ProductCard";
import { useCartContext } from "../../hooks/useCartContext";

export function ProductsGrid({ products }) {
	const { addCart } = useCartContext();

	return (
		<div className="products-grid">
			{products.map((product) => (
				<ProductCard
					key={product.id}
					product={product}
					addCart={addCart}
				/>
			))}
		</div>
	);
}

import { useCartContext } from "../../hooks/useCartContext";
import { ProductCard } from "./ProductCard";

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

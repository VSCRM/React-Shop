import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid'
import { useProducts } from '../../hooks/useProducts';
import './HomePage.css';

export function HomePage({ cart }) {
	const products = useProducts();

	return (
		<>
			<title>Shop Project</title>

			<Header cart={cart} />

			<div className="home-page">
				<ProductsGrid products={products} />
			</div>
		</>
	);
}

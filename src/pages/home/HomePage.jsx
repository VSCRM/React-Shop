import { useSearchParams } from 'react-router';
import { SEARCH_URL_KEY, DEBOUNCE_DELAY_MS } from '../../utils/constants';
import { Header } from '../../layout/Header';
import { ProductsGrid } from './ProductsGrid';
import { NoSearchResults } from './NoSearchResults';
import { useProducts } from '../../hooks/useProducts';
import { useDebounce } from '../../hooks/useDebounce';
import './HomePage.css';

export function HomePage() {
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get(SEARCH_URL_KEY) ?? '';
	const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAY_MS);
	const products = useProducts(debouncedSearchQuery);

	const hasNoResults = debouncedSearchQuery && products.length === 0;

	return (
		<>
			<title>Shop Project</title>

			<Header />

			<div className="home-page">
				{hasNoResults && <NoSearchResults searchQuery={debouncedSearchQuery} />}
				<ProductsGrid products={products} />
			</div>
		</>
	);
}

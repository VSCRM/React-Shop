import { useSearchParams } from 'react-router';
import { SEARCH_URL_KEY, DEBOUNCE_DELAY_MS } from '@/utils/constants';
import { Header } from '@/layout/Header';
import { ProductsGrid } from './ProductsGrid';
import { NoSearchResults } from './NoSearchResults';
import { useProducts } from '@/hooks/useProducts';
import { useDebounce } from '@/hooks/useDebounce';
import './HomePage.css';

export function HomePage() {
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get(SEARCH_URL_KEY) ?? '';
	const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAY_MS);
	const { products, loading, error } = useProducts(debouncedSearchQuery);

	const hasNoResults = debouncedSearchQuery && !loading && products.length === 0;

	return (
		<>
			<title>Shop Project</title>

			<Header />

			<div className="home-page">
				{error && <p className="error-message">{error}</p>}
				{loading && <p className="loading-message">Loading products…</p>}
				{hasNoResults && <NoSearchResults searchQuery={debouncedSearchQuery} />}
				{!loading && !error && <ProductsGrid products={products} />}
			</div>
		</>
	);
}

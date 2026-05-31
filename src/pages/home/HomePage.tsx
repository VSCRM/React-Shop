import { useSearchParams } from "react-router";
import { Header } from "@/layout/Header";
import { ProductsGrid } from "./ProductsGrid";
import { NoSearchResults } from "./NoSearchResults";
import { useProducts } from "@/hooks/useProducts";
import { useCartContext } from "@/hooks/useCartContext";
import { useDebounce } from "@/hooks/useDebounce";
import { SEARCH_URL_KEY } from "@/utils/constants";
import "./HomePage.css";

export function HomePage() {
	const [searchParams] = useSearchParams();
	const rawQuery = searchParams.get(SEARCH_URL_KEY) ?? "";
	const searchQuery = useDebounce(rawQuery);

	const { addCart } = useCartContext();
	const { products, loading, error } = useProducts(searchQuery);

	const hasResults = products.length > 0;

	return (
		<>
			<title>React Shop</title>

			<Header />

			<div className="home-page">
				{error && <p className="error-message">{error}</p>}
				{loading && <p className="loading-message">Loading products…</p>}

				{!loading && !error && !hasResults && <NoSearchResults />}
				{!loading && hasResults && (
					<ProductsGrid products={products} addCart={addCart} />
				)}
			</div>
		</>
	);
}

import { HeaderLogo } from '../components/HeaderLogo';
import { HeaderSearch } from '../components/HeaderSearch';
import { HeaderNav } from '../components/HeaderNav';
import { useCartContext } from '../hooks/useCartContext';
import './Header.css';

export function Header() {
	const { cart } = useCartContext();

	return (
		<div className="header">
			<HeaderLogo />
			<HeaderSearch />
			<HeaderNav cart={cart} />
		</div>
	);
}

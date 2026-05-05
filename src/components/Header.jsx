import { HeaderLogo } from './HeaderLogo';
import { HeaderSearch } from './HeaderSearch';
import { HeaderNav } from './HeaderNav';
import './Header.css';

export function Header({ cart }) {
	return (
		<div className="header">
			<HeaderLogo />
			<HeaderSearch />
			<HeaderNav cart={cart} />
		</div>
	);
}

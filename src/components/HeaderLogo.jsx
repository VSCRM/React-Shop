import { Link } from 'react-router';

export function HeaderLogo() {
	return (
		<div className="left-section">
			<Link to="/" className="header-link">
				<img className="logo" src="images/logo-white.png" />
				<img className="mobile-logo" src="images/mobile-logo-white.png" />
			</Link>
		</div>
	);
}

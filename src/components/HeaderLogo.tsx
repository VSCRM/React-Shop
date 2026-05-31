import { Link } from "react-router";
import { staticImage } from "@/utils/imageUrl";

export function HeaderLogo() {
	return (
		<div className="left-section">
			<Link to="/" className="header-link">
				<img
					className="logo"
					src={staticImage("images/logo-white.png")}
					alt="logo"
				/>
				<img
					className="mobile-logo"
					src={staticImage("images/mobile-logo-white.png")}
					alt="logo"
				/>
			</Link>
		</div>
	);
}

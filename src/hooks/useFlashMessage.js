import { useState } from "react";

export function useFlashMessage(duration = 2000) {
	const [active, setActive] = useState(false);

	const trigger = () => {
		setActive(true);
		setTimeout(() => setActive(false), duration);
	};

	return [
		active, trigger
	];
}

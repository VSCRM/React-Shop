import { useState } from "react";

export function useAddToCartAnimation() {
	const [isAdded, setIsAdded] = useState(false);
	const [timeoutId, setTimeoutId] = useState(null);

	const triggerAnimation = () => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		setIsAdded(true);

		const id = setTimeout(() => {
			setIsAdded(false);
		}, 2000);
		setTimeoutId(id);
	};

	return {
		isAdded,
		triggerAnimation
	};
}

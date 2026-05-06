import { useState, useEffect, useRef, useCallback } from "react";

export function useFlashMessage(duration = 2000) {
	const [active, setActive] = useState(false);
	const timerRef = useRef(null);

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	const trigger = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		setActive(true);

		timerRef.current = setTimeout(() => {
			setActive(false);
			timerRef.current = null;
		}, duration);
	}, [duration]);

	return [active, trigger];
}

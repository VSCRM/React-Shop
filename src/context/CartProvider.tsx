import type { ReactNode } from "react";
import { CartContext } from "@/context/CartContext";
import { useCart } from "@/hooks/useCart";

interface Props {
	children: ReactNode;
}

export function CartProvider({ children }: Props) {
	const cartData = useCart();

	return (
		<CartContext.Provider value={cartData}>{children}</CartContext.Provider>
	);
}

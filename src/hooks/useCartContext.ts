import { useContext } from "react";
import type { CartContextValue } from "@/types";
import { CartContext } from "@/context/CartContext";

export const useCartContext = (): CartContextValue => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCartContext must be used inside <CartProvider>");
	}
	return context;
};

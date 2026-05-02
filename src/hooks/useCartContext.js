import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const useCartContext = () => {
	const context = useContext(CartContext);
	return context;
};

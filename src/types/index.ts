export interface Rating {
	stars: number;
	count: number;
}

export interface Product {
	id: string;
	name: string;
	image: string;
	priceCents: number;
	rating: Rating;
}

export interface DeliveryOption {
	id: string;
	priceCents: number;
	estimatedDeliveryTimeMs: number;
}

export interface CartItem {
	productId: string;
	quantity: number;
	deliveryOptionId: string;
	product: Product;
}

export interface OrderProduct {
	productId: string;
	quantity: number;
	estimatedDeliveryTimeMs: number;
	product: Product;
}

export interface Order {
	id: string;
	orderTimeMs: number;
	totalCostCents: number;
	products: OrderProduct[];
}

export interface PaymentSummary {
	totalItems: number;
	productCostCents: number;
	shippingCostCents: number;
	totalCostBeforeTaxCents: number;
	taxCents: number;
	totalCostCents: number;
}

export type TrackingStatus = 'Preparing' | 'Shipped' | 'Delivered';

export interface CartContextValue {
	cart: CartItem[];
	cartError: string | null;
	loadCart: () => Promise<void>;
	addCart: (productId: string, quantity: number) => Promise<void>;
	updateDeliveryOption: (productId: string, deliveryOptionId: string) => Promise<void>;
	updateQuantity: (productId: string, quantity: number) => Promise<void>;
	removeItem: (productId: string) => Promise<void>;
	placeOrder: () => Promise<void>;
}

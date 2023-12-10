import { CartItem } from 'src/store/cart.slice';

export const cartCounter = (items: CartItem[]): number =>
	items.reduce((acc, item) => (acc += item.count), 0);

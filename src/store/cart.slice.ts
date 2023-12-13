import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadLocalState } from './storage';

export interface CartItem {
	id: number;
	count: number;
}
export interface CartState {
	items: CartItem[];
}

export const CART_STORAGE_KEY = 'userCart';

const initialState: CartState = {
	items: loadLocalState<CartItem[]>(CART_STORAGE_KEY) ?? []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		increase: (state, action: PayloadAction<number>) => {
			const existed = state.items.find((i) => i.id === action.payload);
			if (existed) {
				state.items.map((i) => {
					if (i.id === action.payload) {
						i.count += 1;
					}
					return;
				});
			}
			return;
		},
		decrease: (state, action: PayloadAction<number>) => {
			const existed = state.items.find((i) => i.id === action.payload);
			if (existed) {
				state.items.map((i) => {
					if (i.id === action.payload) {
						if (i.count === 1) {
							state.items = state.items.filter((i) => i.id !== action.payload);
							return;
						}
						i.count -= 1;
						return;
					}
					return;
				});
			}
			return;
		},
		remove: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((i) => i.id !== action.payload);
		},
		add: (state, action: PayloadAction<number>) => {
			const existed = state.items.find((i) => i.id === action.payload);
			if (!existed) {
				state.items.push({ id: action.payload, count: 1 });
			} else {
				state.items.map((i) => {
					if (i.id === action.payload) {
						i.count += 1;
					}
				});
			}
		}
	}
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;

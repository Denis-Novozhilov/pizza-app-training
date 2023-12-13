import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_STORAGE_KEY } from './user.slice';
import { saveLocalState } from './storage';
import cartSlice, { CART_STORAGE_KEY } from './cart.slice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		cart: cartSlice
	}
});

store.subscribe(() => {
	saveLocalState({ jwt: store.getState().user.jwt }, JWT_STORAGE_KEY);
	saveLocalState(store.getState().cart.items, CART_STORAGE_KEY);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

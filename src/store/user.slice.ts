import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { PREFIX } from 'src/helpers/api';
import { LoginResponse } from 'src/interfaces/auth.interface';
import { ProfileResponse } from 'src/interfaces/profile.interface';
import { loadState } from './storage';
import { RootState } from './store';

export interface UserPersistentState {
	jwt: string | null;
}

export interface UserState {
	jwt: string | null;
	loginErrorMessage?: string;
	registrationErrorMessage?: string;
	profile?: ProfileResponse | null | undefined;
	profileErrorMessage?: string;
}

export const JWT_STORAGE_KEY = 'userData';
export const PROFILE_STORAGE_KEY = 'userProfile';

const initialState: UserState = {
	jwt: loadState<UserPersistentState>(JWT_STORAGE_KEY)?.jwt ?? null,
	profile: loadState<ProfileResponse>(PROFILE_STORAGE_KEY) ?? null
};

export const loginThunk = createAsyncThunk(
	'user/login',
	async (params: { email: string; password: string }) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password
			});
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				throw new Error(error.response?.data.message);
			}
		}
	}
);

export const registrationThunk = createAsyncThunk(
	'user/registration',
	async (params: { email: string; name: string; password: string }) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
				email: params.email,
				name: params.name,
				password: params.password
			});
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				throw new Error(error.response?.data.message);
			}
		}
	}
);

export const getProfileThunk = createAsyncThunk<ProfileResponse, void, { state: RootState }>(
	'user/getProfile',
	async (_, thunkApi) => {
		try {
			const jwt = thunkApi.getState().user.jwt;
			const { data } = await axios.get<ProfileResponse>(`${PREFIX}/user/profile`, {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			});
			return data as ProfileResponse;
		} catch (error) {
			if (error instanceof AxiosError) {
				// throw new Error(error.response?.data.message);
				return thunkApi.rejectWithValue({
					errorMessage: error.response?.data.message
				});
			}
			return thunkApi.rejectWithValue({
				errorMessage: error
			});
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// addJwt: (state, action: PayloadAction<string>) => {
		// 	state.jwt = action.payload;
		// },
		logout: (state) => {
			state.jwt = null;
			state.profile = null;
		},
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		},
		clearProfileError: (state) => {
			state.profileErrorMessage = undefined;
		},
		clearRegisterError: (state) => {
			state.registrationErrorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(loginThunk.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(loginThunk.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});
		builder.addCase(getProfileThunk.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.profile = action.payload;
		});
		builder.addCase(getProfileThunk.rejected, (state, action) => {
			state.profileErrorMessage = action.error.message;
		});
		builder.addCase(registrationThunk.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(registrationThunk.rejected, (state, action) => {
			state.registrationErrorMessage = action.error.message;
		});
	}
});

export default userSlice.reducer;
export const userActions = userSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthUserSlice {
	id: string | null;
	isAuth: boolean;
	role: 'CLIENT' | 'ADMIN' | null;
}

const initialState: AuthUserSlice = {
	id: null,
	isAuth: false,
	role: null,
};
export const authUserSlice = createSlice({
	name: 'AUTH_USER_SLICE_NAME',
	initialState,
	reducers: {
		setAuthUser(state, action: PayloadAction<AuthUserSlice>) {
			state.id = action.payload.id;
			state.isAuth = action.payload.isAuth;
			state.role = action.payload.role;
		},
		clearAuthUser(state) {
			state.id = null;
			state.isAuth = false;
			state.role = null;
		},
	},
	selectors: {
		getIsAuthUser: (state: AuthUserSlice) => state.isAuth,
		getUser: (state: AuthUserSlice) => state,
	},
});

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/shared/types/store';

interface LoadingState {
	isLoading: boolean;
}

const initialState: LoadingState = {
	isLoading: false,
};

const LOADING_SLICE_NAME = 'loading';

export const loadingSlice = createSlice({
	name: LOADING_SLICE_NAME,
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
	},
});

export const selectIsLoading = (state: RootState) =>
	state[LOADING_SLICE_NAME].isLoading;

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;

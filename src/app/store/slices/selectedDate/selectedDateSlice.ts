import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedDateState {
	date: string | Date | null;
}

const initialState: SelectedDateState = {
	date: null,
};

export const selectedDateSlice = createSlice({
	name: 'SELECTED_DATE_SLICE_NAME',
	initialState,
	reducers: {
		setSelectedDate(state, action: PayloadAction<string>) {
			state.date = action.payload;
		},
		clearSelectedDate(state) {
			state.date = null;
		},
	},
	selectors: {
		getSelectedDate: (state: SelectedDateState) => state.date,
	},
});

// export const { setSelectedDate, clearSelectedDate } = selectedDateSlice.actions;
// export default selectedDateSlice.reducer;

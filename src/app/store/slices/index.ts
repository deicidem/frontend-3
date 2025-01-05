import { combineReducers } from '@reduxjs/toolkit';
import { selectedDateSlice } from './selectedDate/selectedDateSlice';
import { loadingSlice } from '@/app/store/slices/loading/loadingSlice';
import { authUserSlice } from '@/app/store/slices/user/authUserSlice';

const rootReducer = combineReducers({
	[authUserSlice.name]: authUserSlice.reducer,
	[selectedDateSlice.name]: selectedDateSlice.reducer,
	[loadingSlice.name]: loadingSlice.reducer,
});

export default rootReducer;

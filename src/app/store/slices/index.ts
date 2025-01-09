import { combineReducers } from '@reduxjs/toolkit';
import { authUserSlice } from '@/app/store/slices/user/authUserSlice';

const rootReducer = combineReducers({
	[authUserSlice.name]: authUserSlice.reducer,
});

export default rootReducer;

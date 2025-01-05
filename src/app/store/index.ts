import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import { selectedDateSlice } from './slices/selectedDate/selectedDateSlice';
import { loadingSlice } from '@/app/store/slices/loading/loadingSlice';
import { authUserSlice } from '@/app/store/slices/user/authUserSlice';

const rootReducer = combineReducers({
	[authUserSlice.name]: authUserSlice.reducer,
	// [userApi.reducerPath]: userApi.reducer,
	// [authApi.reducerPath]: authApi.reducer,
	[selectedDateSlice.name]: selectedDateSlice.reducer,
	[loadingSlice.name]: loadingSlice.reducer,
});

const persistConfig = {
	key: 'root',
	storage,
	version: 1,
	blacklist: ['loading'],
	//[authApi.reducerPath]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(
			[]
			//[authApi.middleware, userApi.middleware]
		),
});

export const persistor = persistStore(store);
export default store;

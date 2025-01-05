import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../types/store';
import { Api } from '@/shared/utils/api/api';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: RootState;
	dispatch: AppDispatch;
	extra: Api;
}>();

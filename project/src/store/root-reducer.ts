import { combineReducers } from 'redux';
import { queryApi } from '../services/query-api';

import { mainSlice } from './main-slice/main-slice';
import { userSlice } from './user-slice/user-slice';


export const rootReducer = combineReducers({
  [queryApi.reducerPath]: queryApi.reducer,
  [mainSlice.name]: mainSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

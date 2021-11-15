import { combineReducers } from 'redux';
import { mainData } from './main-data/main-data';
import { userData } from './user-data/user-data';


export const enum ReducerName {
  MainData = 'MainData',
  UserData = 'UserData',
}

export const rootReducer = combineReducers({
  [ReducerName.MainData]: mainData,
  [ReducerName.UserData]: userData,
});

export type RootState = ReturnType<typeof rootReducer>;

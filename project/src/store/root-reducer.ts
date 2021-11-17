import { combineReducers } from 'redux';
import { errorStatus } from './error-status/error-status';
import { favoriteData } from './favorite-data/favorite-data';
import { mainData } from './main-data/main-data';
import { movieData } from './movie-data/movie-data';
import { userData } from './user-data/user-data';


export const enum ReducerName {
  MainData = 'MainData',
  MovieData = 'MovieData',
  FavoriteData = 'FavoriteData',
  UserData = 'UserData',
  ErrorStatus= 'ErrorStatus',
}

export const rootReducer = combineReducers({
  [ReducerName.MainData]: mainData,
  [ReducerName.MovieData]: movieData,
  [ReducerName.FavoriteData]: favoriteData,
  [ReducerName.UserData]: userData,
  [ReducerName.ErrorStatus]: errorStatus,
});

export type RootState = ReturnType<typeof rootReducer>;

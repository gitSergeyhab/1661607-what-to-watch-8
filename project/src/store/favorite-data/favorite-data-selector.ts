import { Film, State } from '../../types/types';
import { ReducerName } from '../root-reducer';

export const getFavorites = (state: State): Film[] => state[ReducerName.FavoriteData].favorites;
export const getFavoritesLoadedStatus = (state: State): boolean => state[ReducerName.FavoriteData].areFavoritesLoaded;

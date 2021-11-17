import { State } from '../../types/types';
import { ReducerName } from '../root-reducer';


const errorField = ReducerName.ErrorStatus;

export const getMainErrorStatus = (state: State): boolean => state[errorField].main;
export const getMovieErrorStatus = (state: State): boolean => state[errorField].movie;
export const getMainFavoriteStatus = (state: State): boolean => state[errorField].favorite;

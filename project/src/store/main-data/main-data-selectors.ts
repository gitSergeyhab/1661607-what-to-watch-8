import { createSelector } from 'reselect';
import { Film, State } from '../../types/types';
import { getGenreList } from '../../util/util';
import { ReducerName } from '../root-reducer';


const mainField = ReducerName.MainData;

// const getGenres = (state: State): string[] => state[mainField].genres;

export const getFilms = (state: State): Film[] => state[mainField].films;
export const getPromo = (state: State): Film | null => state[mainField].promo;
export const getFilmsLoadedStatus = (state: State): boolean => state[mainField].areFilmsLoaded;
export const getPromoLoadedStatus = (state: State): boolean => state[mainField].isPromoLoaded;

export const getGenres = createSelector([getFilms], (films) => getGenreList(films));

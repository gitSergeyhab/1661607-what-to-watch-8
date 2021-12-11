import { State } from '../../types/types';
import { mainSlice } from './main-slice';

export const getGenres = (state: State): string[] => state[mainSlice.name].genres;

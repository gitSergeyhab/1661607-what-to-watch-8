import { createSelector } from 'reselect';
import { Comment, Film, State } from '../../types/types';
import { ReducerName } from '../root-reducer';

const MAX_SIMILAR_NUMBER = 4;

const movieField = ReducerName.MovieData;

export const getMovie = (state: State): Film | null => state[movieField].movie;
export const getSimilar = (state: State): Film[] => state[movieField].similar;
export const getComments = (state: State): Comment[] => state[movieField].comments;

export const getMovieLoadedStatus = (state: State): boolean => state[movieField].isMovieLoaded;
export const getSimilarLoadedStatus = (state: State): boolean => state[movieField].areSimilarLoaded;

export const getNeedSimilar = createSelector([getSimilar], (similar) => similar.slice(0, MAX_SIMILAR_NUMBER));

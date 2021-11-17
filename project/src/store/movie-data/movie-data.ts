import { createReducer } from '@reduxjs/toolkit';
import {Comment, Film} from '../../types/types';
import { changeMovieLoadedStatus, loadComments, loadMovie, loadSimilar } from '../action';

type MovieData = {
  movie: Film | null,
  isMovieLoaded: boolean,
  similar: Film[],
  areSimilarLoaded: boolean,
  comments: Comment[]
}

const initialState: MovieData = {
  movie: null,
  isMovieLoaded: false,
  similar: [],
  areSimilarLoaded: false,
  comments: [],
};

export const movieData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadMovie, (state, action) => {
      state.movie = action.payload;
      state.isMovieLoaded = true;
    })
    .addCase(loadSimilar, (state, action) => {
      state.similar = action.payload;
      state.areSimilarLoaded = true;
    })
    .addCase(loadComments, (state, action) => {state.comments = action.payload;})
    .addCase(changeMovieLoadedStatus, (state, action) => {state.isMovieLoaded = action.payload;});
});

import { createReducer } from '@reduxjs/toolkit';
import { changeFavoriteErrorStatus, changeMainErrorStatus, changeMovieErrorStatus } from '../action';


type ErrorStatus = {
  main: boolean,
  movie: boolean,
  favorite: boolean
};

const initialState: ErrorStatus = {
  main: false,
  movie: false,
  favorite: false,
};

export const errorStatus = createReducer(initialState, (builder) => {
  builder
    .addCase(changeMainErrorStatus, (state, action) => {state.main = action.payload;})
    .addCase(changeMovieErrorStatus, (state, action) => {state.movie = action.payload;})
    .addCase(changeFavoriteErrorStatus, (state, action) => {state.favorite = action.payload;});
});

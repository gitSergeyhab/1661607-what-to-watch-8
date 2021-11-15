import { createReducer } from '@reduxjs/toolkit';
import { Film } from '../../types/types';
import { loadFilms, loadPromo } from '../action';


type MainData = {
  areFilmsLoaded: boolean,
  isPromoLoaded: boolean,
  promo: null | Film,
  films: Film[],
};

const initialState: MainData = {
  areFilmsLoaded: false,
  isPromoLoaded: false,
  promo: null,
  films: [],
};


export const mainData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.areFilmsLoaded = true;
    })
    .addCase(loadPromo, (state, action) => {
      state.promo = action.payload;
      state.isPromoLoaded = true;
    });
});

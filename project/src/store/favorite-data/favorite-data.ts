import { createReducer } from '@reduxjs/toolkit';
import { Film } from '../../types/types';
import { loadFavorite } from '../action';

type FavoriteData = {
  favorites: Film[],
  areFavoritesLoaded: boolean,
}

const initialState: FavoriteData = {
  favorites: [],
  areFavoritesLoaded: false,
};

export const favoriteData = createReducer(initialState, (builder) => {
  builder.addCase(loadFavorite, (state, action) => {
    state.favorites = action.payload;
    state.areFavoritesLoaded = true;
  });
});

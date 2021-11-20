import { createAction } from '@reduxjs/toolkit';
import { Comment, Film } from '../types/types';


export const enum ActionType {
  LoadFilms = 'data/main/films/LoadFilms',
  LoadPromo = 'data/main/promo/LoadPromo',
  LoadMovie = 'data/movie/film/LoadMovie',
  LoadSimilar = 'data/movie/similar/LoadSimilar',
  LoadComments = 'data/movie/comments/LoadComments',
  ChangeMovieLoadedStatus = 'movie/ChangeMovieLoadedStatus',
  LoadFavorite = 'data/myList/LoadFavorite',
  RequireLogout = 'user/RequireLogout',
  RequireLogin = 'user/RequireLogin',
  ChangeMainErrorStatus = 'error/main/ChangeMainErrorStatus',
  ChangeMovieErrorStatus = 'error/movie/ChangeMovieErrorStatus',
  ChangeFavoriteErrorStatus = 'error/favorite/ChangeFavoriteErrorStatus',
  PostReview = 'post/addReview/PostReview',

}


export const loadFilms = createAction(ActionType.LoadFilms, (films: Film[]) => ({payload: films}));
export const loadPromo = createAction(ActionType.LoadPromo, (film: Film) => ({payload: film}));

export const loadMovie = createAction(ActionType.LoadMovie, (film: Film) => ({payload: film}));
export const loadSimilar = createAction(ActionType.LoadSimilar, (films: Film[]) => ({payload: films}));
export const loadComments = createAction(ActionType.LoadComments, (comments: Comment[]) => ({payload: comments}));
export const changeMovieLoadedStatus = createAction(ActionType.ChangeMovieLoadedStatus, (status) => ({payload: status}));

export const loadFavorite = createAction(ActionType.LoadFavorite, (films: Film[]) => ({payload: films}));

export const requireLogout = createAction(ActionType.RequireLogout);
export const requireLogin = createAction(ActionType.RequireLogin);

export const changeMainErrorStatus = createAction(ActionType.ChangeMainErrorStatus, (error) => ({payload: error}));
export const changeMovieErrorStatus = createAction(ActionType.ChangeMovieErrorStatus, (error) => ({payload: error}));
export const changeFavoriteErrorStatus = createAction(ActionType.ChangeFavoriteErrorStatus, (error) => ({payload: error}));

export const postReview = createAction(ActionType.PostReview, (review) => ({payload: review}));

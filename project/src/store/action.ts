import { createAction } from '@reduxjs/toolkit';
import { Film } from '../types/types';


export const enum ActionType {
  LoadFilms = 'data/main/films/LoadFilms',
  LoadPromo = 'data/main/promo/LoadPromo',
  GetGenres = 'main/genres/GetGenres',
  // ChangeGenre = 'main/genre/ChangeGenre',
  // ChangeFilmsByGenre = 'main/films/GetFilmsByGenre',
  RequireLogout = 'user/RequireLogout',
  RequireLogin = 'user/RequireLogin',
}

// export const loadFilms = (films: Film[]) => ({type: ActionType.LoadFilms, payload: films});

// export const loadPromo = (film: Film) => ({type: ActionType.LoadPromo, payload: film});

// export const getGenres = (genres: Film[]) => ({type: ActionType.GetGenres, payload: genres});


// export const requireLogout = () => ({type: ActionType.RequireLogout});
// export const requireAuthorization = (status: AuthorizationStatus) => ({type: ActionType.RequireAuthorization, payload: status});


export const loadFilms = createAction(ActionType.LoadFilms, (films: Film[]) => ({payload: films}));

export const loadPromo = createAction(ActionType.LoadPromo, (film: Film) => ({payload: film}));

export const getGenres = createAction(ActionType.GetGenres, (films: Film[]) => ({payload: films}));

export const requireLogout = createAction(ActionType.RequireLogout);

export const requireLogin = createAction(ActionType.RequireLogin);

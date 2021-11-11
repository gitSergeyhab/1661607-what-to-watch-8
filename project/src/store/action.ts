import { Film } from '../types/types';


export const enum ActionType {
  LoadFilms = 'data/main/films/LoadFilms',
  GetGenres = 'main/genres/GetGenres',
  ChangeGenre = 'main/genre/ChangeGenre',
  ChangeFilmsByGenre = 'main/films/GetFilmsByGenre',
}

export const loadFilms = (films: Film[]) => ({type: ActionType.LoadFilms, payload: films});

export const getGenres = (genres: Film[]) => ({type: ActionType.GetGenres, payload: genres});

export const changeGenre = (genre: string) => ({type: ActionType.ChangeGenre, payload: genre});

export const changeFilmsByGenre = (genre: string) => ({type: ActionType.ChangeFilmsByGenre, payload: genre});


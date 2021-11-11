import { ALL_GENRES } from '../const';
import { FILMS } from '../mocks';
import { Film } from '../types/types';
import { getFilmsByGenre, getGenreList } from '../util';
import { ActionType } from './action';


export type State = {
  areFilmsLoaded: boolean,
  films: Film[],
  genres: string[],
  genre: string,
  filmsByGenre: Film[],
}

// const initialState: State = {
//   areFilmsLoaded: false,
//   films: [],
//   genres: [ALL_GENRES],
//   genre: ALL_GENRES,
//   filmsByGenre: [],
// };

const initialState: State = {
  areFilmsLoaded: true,
  films: FILMS,
  genres: [ALL_GENRES],
  genre: ALL_GENRES,
  filmsByGenre: [],
};


export const reducer = (state = initialState, action: any): State => {
  switch(action.type) {
    case ActionType.LoadFilms:
      return {...state, films: action.payload, areFilmsLoaded: true};
    case ActionType.GetGenres:
      return {...state, genres: getGenreList(action.payload)};
    case ActionType.ChangeGenre:
      return {...state, genre: action.payload};
    case ActionType.ChangeFilmsByGenre:
      return {...state, filmsByGenre: getFilmsByGenre(state.films, action.payload)};
    default: return state;
  }
};

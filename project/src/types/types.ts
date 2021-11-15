import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store/root-reducer';
import { Action } from 'redux';

export type Film = {
  id: number,
  name: string,
  posterImage: string,
  previewImage: string,
  backgroundImage: string,
  backgroundColor: string,
  videoLink: string,
  previewVideoLink: string,
  description: string,
  rating: number,
  scoresCount: number,
  director: string,
  starring: string[],
  runTime: number,
  genre: string,
  released: number,
  isFavorite: boolean,
};

export type ServerFilm = {
  id: number,
  name: string,
  'poster_image'?: string,
  'preview_image'?: string
  'background_image'?: string,
  'background_color'?: string,
  'video_link'?: string,
  'preview_video_link'?: string,
  description: string,
  rating: number,
  'scores_count'?: number,
  director: string,
  starring: string[],
  'run_time'?: number,
  genre: string,
  released: number,
  'is_favorite'?: boolean,
};

export type Comment = {
  id: number,
  user: {
    id: number,
    name: string,
  },
  rating: number,
  comment: string,
  date: string,
};

export type State = RootState;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkDispatchResult = ThunkDispatch<State, AxiosInstance, Action>


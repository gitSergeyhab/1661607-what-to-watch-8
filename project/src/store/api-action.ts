import { adaptFilmToClient } from '../services/adapters';
import { removeAvatar, removeToken, saveAvatar, saveToken } from '../services/auth-info';
import { ServerFilm, ThunkActionResult } from '../types/types';
import { changeFavoriteErrorStatus, changeMainErrorStatus, changeMovieErrorStatus, changeMovieLoadedStatus, loadComments, loadFavorite, loadFilms, loadMovie, loadPromo, loadSimilar, requireLogin, requireLogout } from './action';

const AVATAR_URL = 'avatar_url';

const enum APIRoute {
  films = '/films',
  promo = '/promo',
  similar = '/similar',
  favorite = '/favorite',
  comments = '/comments',
  login = '/login',
  logout = '/logout',
}

type AuthData = {email: string, password: string};

export const checkAuthStatus = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.login);
    dispatch(requireLogin());
  };

export const loginAction = ({email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} =  await api.post(APIRoute.login, {email, password});
    const {token, [AVATAR_URL]: avatar} = data;
    saveToken(token);
    saveAvatar(avatar);
    dispatch(requireLogin());
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.delete(APIRoute.logout);
    removeToken();
    removeAvatar();
    dispatch(requireLogout());
  };


export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.get<ServerFilm[]>(APIRoute.films);
      const films = data.map((film) => adaptFilmToClient(film));
      dispatch(loadFilms(films));
      dispatch(changeMainErrorStatus(false));
    } catch {
      dispatch(changeMainErrorStatus(true));
    }
  };

export const fetchPromoAction = (): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    const {data} = await api.get<ServerFilm>(APIRoute.promo);
    dispatch(loadPromo(adaptFilmToClient(data)));
  };


export const fetchMovieAction = (filmId: string): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try{
      const {data} = await api.get(`${APIRoute.films}/${filmId}`);
      dispatch(changeMovieLoadedStatus(false));
      dispatch(loadMovie(adaptFilmToClient(data)));
      dispatch(changeMovieErrorStatus(false));
    } catch {
      dispatch(changeMovieErrorStatus(true));
    }
  };


export const fetchCommentAction = (filmId: string): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    const {data} = await api.get(`${APIRoute.comments}/${filmId}`);
    dispatch(loadComments(data));
  };


export const fetchSimilarAction = (filmId: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const path = `${APIRoute.films}/${filmId}${APIRoute.similar}`;
    const {data} = await api.get<ServerFilm[]>(path);
    const similar = data.map((film) => adaptFilmToClient(film));
    dispatch(loadSimilar(similar));
  };


export const fetchFavoritesAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.get<ServerFilm[]>(APIRoute.favorite);
      const favorites = data.map((film) => adaptFilmToClient(film));
      dispatch(loadFavorite(favorites));
      dispatch(changeFavoriteErrorStatus(false));
    } catch {
      dispatch(changeFavoriteErrorStatus(false));
    }
  };


type PostReview = {id: string, rating: number, comment: string, unBlock: () => void, clear: () => void}

export const postReviewAction = ({id, rating, comment, unBlock, clear}: PostReview): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post(`${APIRoute.comments}/${id}`, {rating, comment});
      dispatch(loadComments(data));
      clear();
    } catch {
      console.log('error postReviewAction');
    }
    unBlock();
  };

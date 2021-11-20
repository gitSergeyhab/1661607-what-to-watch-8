import { toast } from 'react-toastify';

import { adaptFilmToClient } from '../services/adapters';
import { removeAvatar, removeToken, saveAvatar, saveToken } from '../services/auth-info';
import { changeFavoriteErrorStatus, changeMainErrorStatus, changeMovieErrorStatus, changeMovieLoadedStatus, loadComments, loadFavorite, loadFilms, loadMovie, loadPromo, loadSimilar, requireLogin, requireLogout } from './action';
import { ServerFilm, ThunkActionResult } from '../types/types';
import { APIRoute, BtnLocation } from '../const';

import 'react-toastify/dist/ReactToastify.css';


const AVATAR_URL = 'avatar_url';

const ErrorMessage = {
  Login: 'unable to log in',
  Logout: 'unable to log out',
  FetchFilms: 'unable to upload films',
  FetchPromo: 'unable to upload promo movie',
  FetchSimilar: 'unable to upload similar movies',
  FetchMovie: 'unable to upload this movie',
  FetchComments: 'unable to upload comments',
  FetchFavorite: 'unable to upload your movie list',
  PostComment: 'unable to send comment',
  PostFavorite: 'unable to change my list status',
  CheckAuthStatus: 'unable to check your status',
};


//AUTH
type AuthData = {email: string, password: string};

export const checkAuthStatus = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireLogin());
    } catch {
      dispatch(requireLogout());
    }
  };

export const loginAction = ({email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} =  await api.post(APIRoute.Login, {email, password});
      const {token, [AVATAR_URL]: avatar} = data;
      saveToken(token);
      saveAvatar(avatar);
      dispatch(requireLogin());
    } catch {
      toast.error(ErrorMessage.Login);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.delete(APIRoute.Logout);
      removeToken();
      removeAvatar();
      dispatch(requireLogout());
    } catch {
      toast.error(ErrorMessage.Logout);
    }
  };

// MAIN
export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      dispatch(changeMainErrorStatus(false));
      const {data} = await api.get<ServerFilm[]>(APIRoute.Films);
      const films = data.map((film) => adaptFilmToClient(film));
      dispatch(loadFilms(films));
    } catch {
      dispatch(changeMainErrorStatus(true));
      toast.error(ErrorMessage.FetchFilms);
    }
  };

export const fetchPromoAction = (): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      const {data} = await api.get<ServerFilm>(APIRoute.Promo);
      dispatch(loadPromo(adaptFilmToClient(data)));
    } catch {
      toast.error(ErrorMessage.FetchPromo);
    }
  };


// MOVIE
export const fetchMovieAction = (filmId: string): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try{
      dispatch(changeMovieErrorStatus(false));
      dispatch(changeMovieLoadedStatus(false));
      const {data} = await api.get(`${APIRoute.Films}/${filmId}`);
      dispatch(loadMovie(adaptFilmToClient(data)));
    } catch {
      dispatch(changeMovieErrorStatus(true));
      toast.error(ErrorMessage.FetchMovie);
    }
  };

export const fetchCommentAction = (filmId: string): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    try {
      const {data} = await api.get(`${APIRoute.Comments}/${filmId}`);
      dispatch(loadComments(data));
    } catch {
      toast.warn(ErrorMessage.FetchComments);
    }
  };

export const fetchSimilarAction = (filmId: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const path = `${APIRoute.Films}/${filmId}${APIRoute.Similar}`;
      const {data} = await api.get<ServerFilm[]>(path);
      const similar = data.map((film) => adaptFilmToClient(film));
      dispatch(loadSimilar(similar));
    } catch {
      toast.warn(ErrorMessage.FetchSimilar);
    }
  };


// FAVORITE
export const fetchFavoritesAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      dispatch(changeFavoriteErrorStatus(false));
      const {data} = await api.get<ServerFilm[]>(APIRoute.Favorite);
      const favorites = data.map((film) => adaptFilmToClient(film));
      dispatch(loadFavorite(favorites));
    } catch {
      dispatch(changeFavoriteErrorStatus(true));
      toast.error(ErrorMessage.FetchFavorite);
    }
  };


// ADD REVIEW
type PostReview = {id: string, rating: number, comment: string, unBlock: () => void, push: () => void}

export const postReviewAction = ({id, rating, comment, unBlock, push}: PostReview): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post(`${APIRoute.Comments}/${id}`, {rating, comment});
      dispatch(loadComments(data));
      push();
    } catch {
      toast.warn(ErrorMessage.PostComment);
    }
    unBlock();
  };


// BTN
type PostFilmStatusArgs = {id: number, status: number, location: BtnLocation};

export const postFilmStatusAction = ({id, status, location} : PostFilmStatusArgs) : ThunkActionResult =>
  async (dispatch, getState, api) => {
    try {
      const {data} = await api.post(`${APIRoute.Favorite}/${id}/${status}`);
      const newFilm = adaptFilmToClient(data);
      if (location === BtnLocation.Movie) {
        if (newFilm.id === getState().MainData.promo?.id) {
          dispatch(loadPromo(newFilm));
        }
        dispatch(loadMovie(newFilm));
      } else {
        dispatch(loadPromo(newFilm));
      }
    } catch {
      toast.error(ErrorMessage.PostFavorite);
    }
  };

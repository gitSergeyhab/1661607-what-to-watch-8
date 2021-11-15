import { adaptFilmToClient } from '../services/adapters';
import { removeAvatar, removeToken, saveAvatar, saveToken } from '../services/auth-info';
import { ServerFilm, ThunkActionResult } from '../types/types';
import { getGenres, loadFilms, loadPromo, requireLogin, requireLogout } from './action';

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
    const {data} = await api.get<ServerFilm[]>(APIRoute.films);
    const films = data.map((film) => adaptFilmToClient(film));
    dispatch(loadFilms(films));
    dispatch(getGenres(films));
  };

export const fetchPromoAction = (): ThunkActionResult =>
  async(dispatch, _getState, api) => {
    const {data} = await api.get<ServerFilm>(APIRoute.promo);
    dispatch(loadPromo(adaptFilmToClient(data)));
  };

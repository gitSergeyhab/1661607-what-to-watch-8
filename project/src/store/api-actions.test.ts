import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../services/api';
import { checkAuthStatus, fetchCommentAction, fetchFavoritesAction, fetchFilmsAction, fetchMovieAction, fetchPromoAction, fetchSimilarAction, loginAction, logoutAction, postFilmStatusAction, postReviewAction } from './api-actions';
import { changeFavoriteErrorStatus, changeMainErrorStatus, changeMovieErrorStatus, changeMovieLoadedStatus, loadComments, loadFavorite, loadFilms, loadMovie, loadPromo, loadSimilar, requireLogin, requireLogout } from './action';
import { adaptFilmToClient } from '../services/adapters';
import { removeAvatar, removeToken, saveAvatar, saveToken } from '../services/auth-info';
import { State } from '../types/types';
import { makeFakeCommentList, makeFakeFilm, makeFakeFilmList } from '../util/test-mocks';
import { MockState, TEST_ID } from '../util/test-const';
import { APIRoute, BtnLocation } from '../const';


const TEST_REVIEW = 'TEST_REVIEW';
const TEST_RATING = 3;
const TEST_STATUS = 1;
const TEST_TOKEN = 'TEST_TOKEN';
const TEST_AVATAR = 'avatar_url';

const testAuthData = {email: 'test@mail.com', password: 'test-pa5Sword'};

jest.mock('../services/auth-info', () => ({
  __esModule: true,
  saveToken: jest.fn(),
  getToken: jest.fn(),
  removeToken: jest.fn(),
  saveAvatar: jest.fn(),
  getAvatar: jest.fn(),
  removeAvatar: jest.fn(),
}),
);

const fakeServerFilms = makeFakeFilmList();
const fakeClientFilms = fakeServerFilms.map((film) => adaptFilmToClient(film));
const fakeComments = makeFakeCommentList();
const fakeServerFilm = makeFakeFilm();
const fakeClientFilm = adaptFilmToClient(fakeServerFilm);


describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized);
  const mockAPI = new MockAdapter(api);
  const middleWares = [thunk.withExtraArgument(api)];

  type MockThunkDispatch = ThunkDispatch<State, typeof api, Action>;
  const mockStore = configureMockStore<State, Action, MockThunkDispatch>(middleWares);


  //AUTH
  describe('AUTH', () => {
    it('checkAuthStatus: should authorizationStatus is «Auth» when server return 200', async () => {
      const store = mockStore();
      mockAPI.onGet(APIRoute.Login).reply(200, []);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(checkAuthStatus());
      expect(store.getActions())
        .toEqual([requireLogin()]);
    });

    it('loginAction: should dispatch requireAuthorization and to called saveToken, saveAvatar', async () => {

      const store = mockStore();
      mockAPI.onPost(APIRoute.Login).reply(200, {token: TEST_TOKEN, email: testAuthData.email, [TEST_AVATAR]: TEST_AVATAR});
      expect(store.getActions()).toEqual([]);
      await store.dispatch(loginAction(testAuthData));

      expect(store.getActions()).toEqual([requireLogin()]);

      expect(saveToken).toBeCalledTimes(1);
      expect(saveToken).toBeCalledWith(TEST_TOKEN);

      expect(saveAvatar).toBeCalledTimes(1);
      expect(saveAvatar).toBeCalledWith(TEST_AVATAR);
    });

    it('logoutAction: should dispatch requireLogout and to called removeToken, removeAvatar', async () => {

      const store = mockStore();
      mockAPI.onDelete(APIRoute.Logout).reply(204, []);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(logoutAction());

      expect(store.getActions()).toEqual([requireLogout()]);

      expect(removeToken).toBeCalledTimes(1);
      expect(removeAvatar).toBeCalledTimes(1);
    });
  });


  // MAIN
  describe('MAIN', () => {
    it('fetchFilmsAction: should dispatch changeMainErrorStatus, loadFilms  when GET /films', async () => {
      const store = mockStore({MainData: {...MockState.FilledOk.MainData}});
      mockAPI.onGet(APIRoute.Films).reply(200, fakeServerFilms);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(fetchFilmsAction());
      expect(store.getActions())
        .toEqual([changeMainErrorStatus(false), loadFilms(fakeClientFilms) ]);
    });

    it('fetchPromoAction: should dispatch loadPromo  when GET /promo', async () => {
      const store = mockStore({MainData: {...MockState.FilledOk.MainData}});
      mockAPI.onGet(APIRoute.Promo).reply(200, fakeServerFilm);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(fetchPromoAction());
      expect(store.getActions())
        .toEqual([loadPromo(fakeClientFilm)]);
    });
  });


  // MOVIE
  describe('MOVIE', () => {

    it('fetchSimilarAction: should dispatch loadSimilar when GET /films/id/similar', async () => {
      const store = mockStore();
      mockAPI.onGet(`${APIRoute.Films}/${TEST_ID}${APIRoute.Similar}`).reply(200, fakeServerFilms);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(fetchSimilarAction(TEST_ID));
      expect(store.getActions())
        .toEqual([loadSimilar(fakeClientFilms)]);
    });

    it('fetchMovieAction: should dispatch changeMovieErrorStatus, changeMovieLoadedStatus and loadMovie when GET /films/id', async () => {
      const store = mockStore();
      mockAPI.onGet(`${APIRoute.Films}/${TEST_ID}`).reply(200, fakeServerFilm);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(fetchMovieAction(TEST_ID));
      expect(store.getActions())
        .toEqual([changeMovieErrorStatus(false), changeMovieLoadedStatus(false), loadMovie(fakeClientFilm)]);
    });

    it('fetchCommentAction: should dispatch loadComments when GET /comments/id', async () => {
      const store = mockStore();
      mockAPI.onGet(`${APIRoute.Comments}/${TEST_ID}`).reply(200, fakeComments);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(fetchCommentAction(TEST_ID));
      expect(store.getActions())
        .toEqual([loadComments(fakeComments)]);
    });

    // ADD REVIEW - Post
    it('postReviewAction: should dispatch loadComments when POST /comments/id', async() => {
      const store = mockStore();
      mockAPI.onPost(`${APIRoute.Comments}/${TEST_ID}`).reply(200,  fakeComments);
      await store.dispatch(postReviewAction({
        id: TEST_ID,
        rating: TEST_RATING,
        comment: TEST_REVIEW,
        unBlock: jest.fn(),
        push: jest.fn(),
      }),
      );
      expect(store.getActions())
        .toEqual([loadComments(fakeComments)]);
    });
  });


  // FAVORITE
  describe('FAVORITES', () => {
    it('fetchFavoritesAction: should dispatch changeFavoriteErrorStatus and loadFavorite when GET /favorites/id', async () => {
      const store = mockStore();
      mockAPI.onGet(APIRoute.Favorite).reply(200, fakeServerFilms);
      expect(store.getActions()).toEqual([]);
      await store.dispatch(fetchFavoritesAction());
      expect(store.getActions())
        .toEqual([changeFavoriteErrorStatus(false), loadFavorite(fakeClientFilms)]);
    });
  });


  // BTN
  describe('BTN-FAVORITE', () => {

    it('postFilmStatusAction: from Promo: should dispatch loadPromo when POST /favorites/id/status', async () => {

      const store = mockStore({...MockState.FilledOk});
      mockAPI.onPost(`${APIRoute.Favorite}/${TEST_ID}/${TEST_STATUS}`).reply(200, fakeServerFilm);
      await store.dispatch(postFilmStatusAction({id: +TEST_ID, status: TEST_STATUS, location: BtnLocation.Promo}));
      expect(store.getActions())
        .toEqual([loadPromo(fakeClientFilm)]);
    });

    it('postFavoriteStatus: from Movie: should dispatch loadPromo, loadMovie when POST /favorites/id/status', async () => {

      const testState = {...MockState.FilledOk, MainData: {...MockState.FilledOk.MainData, promo: fakeClientFilm}};
      const testStore = mockStore(testState);

      mockAPI.onPost(`${APIRoute.Favorite}/${TEST_ID}/${TEST_STATUS}`).reply(200, fakeServerFilm);
      await testStore.dispatch(postFilmStatusAction({id: +TEST_ID, status: TEST_STATUS, location: BtnLocation.Movie}));
      expect(testStore.getActions())
        .toEqual([loadPromo(fakeClientFilm), loadMovie(fakeClientFilm)]);
    });
  });
});

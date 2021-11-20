import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';

import App from './app';
import { renderComponent } from '../../util/test-utils';
import { MockState, ScreenText, TEST_ID } from '../../util/test-const';
import { AppRoute } from '../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

const app = <App/>;
const renderFakeApp = (store: MockStore) => renderComponent(app, store, history);

describe('App Component', () => {
  describe('AUTH and FILLED', () => {
    const state = {...MockState.FilledOk};
    const store = mockStore(state);
    it('test rout /', () => {

      history.push(AppRoute.Main);
      renderFakeApp(store);

      expect(screen.getByText(ScreenText.Main.Play)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Main.MyList)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Main.AllGenres)).toBeInTheDocument();

    });

    it('test rout /login -> redirect to /', () => {

      history.push(AppRoute.SignIn);
      renderFakeApp(store);

      expect(screen.getByText(ScreenText.Main.Play)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Main.MyList)).toBeInTheDocument();
      expect(screen.queryByPlaceholderText(ScreenText.Login.Email)).not.toBeInTheDocument();
    });

    it('test rout /MyList', () => {

      history.push(AppRoute.MyList);
      renderFakeApp(store);

      expect(screen.queryAllByRole('article').length).toBe(state.FavoriteData.favorites.length);
      expect(screen.getByText(ScreenText.Main.MyList)).toBeInTheDocument();

    });

    it('test rout /films/id', () => {

      history.push(`films/${TEST_ID}`);
      renderFakeApp(store);

      expect(screen.getByText(ScreenText.Movie.Auth.AddReview)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Movie.All.Overview)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Movie.All.Reviews)).toBeInTheDocument();
    });

    it('test rout /films/id/review', () => {

      history.push(`/films/${TEST_ID}/review`);
      renderFakeApp(store);

      expect(screen.getByText(ScreenText.AddReview.Title)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.AddReview.Post)).toBeInTheDocument();
    });

    it('test rout /player/id', () => {

      history.push(`/player/${TEST_ID}`);
      renderFakeApp(store);

      expect(screen.getByText(ScreenText.Player.Exit)).toBeInTheDocument();
      expect(screen.getByText(state.MovieData.movie.name)).toBeInTheDocument();
    });

    it('test rout /fake -> redirect to notFoundPage', () => {

      history.push('/fake');
      renderFakeApp(store);

      expect(screen.getByText(ScreenText.Page404.Message)).toBeInTheDocument();
      expect(screen.getByText(ScreenText.Page404.Link)).toBeInTheDocument();
    });
  });


  describe('NO_AUTH and EMPTY', () => {
    const state = {...MockState.EmptyNoAuth};
    const store = mockStore(state);

    it('test rout /', () => {

      history.push(AppRoute.Main);
      renderFakeApp(store);

      expect(screen.queryByText(ScreenText.Main.Play)).not.toBeInTheDocument();
      expect(screen.queryByText(ScreenText.Main.MyList)).not.toBeInTheDocument();
      expect(screen.getByText(ScreenText.Main.AllGenres)).toBeInTheDocument();
    });

    it('test rout /login', () => {

      history.push(AppRoute.SignIn);
      renderFakeApp(store);

      expect(screen.getByPlaceholderText(ScreenText.Login.Email)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(ScreenText.Login.Password)).toBeInTheDocument();
    });

    it('test rout /favorites -> redirect /login', () => {

      history.push(AppRoute.MyList);
      renderFakeApp(store);

      expect(screen.getByPlaceholderText(ScreenText.Login.Email)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(ScreenText.Login.Password)).toBeInTheDocument();
      expect(screen.queryByText(ScreenText.MyList.Filled.Header)).not.toBeInTheDocument();
    });

    it('test rout /review -> redirect /login', () => {

      history.push(`/films/${TEST_ID}/review`);
      renderFakeApp(store);

      expect(screen.queryByText(ScreenText.AddReview.Title)).not.toBeInTheDocument();
      expect(screen.queryByText(ScreenText.AddReview.Post)).not.toBeInTheDocument();

      expect(screen.getByPlaceholderText(ScreenText.Login.Email)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(ScreenText.Login.Password)).toBeInTheDocument();
    });
  });
});

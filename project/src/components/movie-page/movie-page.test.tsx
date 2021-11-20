import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import MoviePage from './movie-page';
import { renderComponent } from '../../util/test-utils';
import { MockState, ScreenText } from '../../util/test-const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

describe ('MoviePage Component', () => {
  it('should render correctly LOADED and AUTH', () => {

    const state = {...MockState.FilledOk};
    const store = mockStore(state);
    renderComponent(<MoviePage authorizationStatus/>, store, history);

    expect(screen.queryByText(ScreenText.Movie.All.Overview)).toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Movie.All.MyList)).toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Movie.All.Play)).toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Movie.Auth.AddReview)).toBeInTheDocument();
  });

  it('should render correctly LOADED and NO AUTH', () => {

    const state = {...MockState.FilledOk, UserData: {authorizationStatus: false}};
    const store = mockStore(state);
    renderComponent(<MoviePage authorizationStatus={false}/>, store, history);

    expect(screen.queryByText(ScreenText.Movie.All.Overview)).toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Movie.All.MyList)).toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Movie.All.Play)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Movie.Auth.AddReview)).not.toBeInTheDocument();
  });

  it('should render Spinner when loading', () => {

    const state = {...MockState.FilledOk, MovieData: {...MockState.FilledOk.MovieData, movie: null}};
    const store = mockStore(state);
    renderComponent(<MoviePage authorizationStatus/>, store, history);

    expect(screen.queryByText(ScreenText.Spinner)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Movie.All.Overview)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Movie.All.MyList)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Movie.Auth.AddReview)).not.toBeInTheDocument();
  });

  it('should render NotFoundPage when movie error', () => {

    const state = {...MockState.FilledOk, ErrorStatus: {movie: true}};
    const store = mockStore(state);
    renderComponent(<MoviePage authorizationStatus/>, store, history);

    expect(screen.queryByText(ScreenText.Page404.Link)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Movie.All.Overview)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Movie.All.MyList)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Movie.Auth.AddReview)).not.toBeInTheDocument();
  });
});

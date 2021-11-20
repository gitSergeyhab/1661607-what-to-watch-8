import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import AddReview from './add-review';
import { renderComponent } from '../../util/test-utils';
import { MockState, ScreenText } from '../../util/test-const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

describe ('AddReview Component', () => {
  it('should render correctly', () => {

    const state = {...MockState.FilledOk};
    const store = mockStore(state);
    renderComponent(<AddReview authorizationStatus/>, store, history);

    expect(screen.queryByText(ScreenText.AddReview.Title)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(ScreenText.AddReview.Placeholder)).toBeInTheDocument();
  });

  it('should render Spinner when loading', () => {

    const state = {...MockState.FilledOk, MovieData: {...MockState.FilledOk.MovieData, movie: null}};
    const store = mockStore(state);
    renderComponent(<AddReview authorizationStatus/>, store, history);

    expect(screen.queryByText(ScreenText.Spinner)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.AddReview.Title)).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(ScreenText.AddReview.Placeholder)).not.toBeInTheDocument();
  });

  it('should render NotFoundPage when movie error', () => {

    const state = {...MockState.FilledOk, ErrorStatus: {movie: true}};
    const store = mockStore(state);
    renderComponent(<AddReview authorizationStatus/>, store, history);

    expect(screen.queryByText(ScreenText.Page404.Link)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.AddReview.Title)).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(ScreenText.AddReview.Placeholder)).not.toBeInTheDocument();
  });
});

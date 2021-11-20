import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import MoviePageSimilar from './movie-page-similar';
import { renderComponent } from '../../util/test-utils';
import { MockState, ScreenText } from '../../util/test-const';
import { MAX_GENRE_NUMBER } from '../../const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

describe ('MoviePageSimilar Component', () => {
  it('should render correctly', () => {

    const state = {...MockState.FilledOk};
    const store = mockStore(state);
    renderComponent(<MoviePageSimilar/>, store, history);

    expect(screen.queryByText(ScreenText.Similar)).toBeInTheDocument();
    expect(screen.queryAllByRole('article').length).toBeLessThanOrEqual(MAX_GENRE_NUMBER);
  });

  it('should render correctly when no similar', () => {

    const state = {...MockState.FilledOk, MovieData: {similar: []}};
    const store = mockStore(state);
    renderComponent(<MoviePageSimilar/>, store, history);

    expect(screen.queryByText(ScreenText.Similar)).not.toBeInTheDocument();
    expect(screen.queryAllByRole('article').length).toBeLessThanOrEqual(0);
  });
});

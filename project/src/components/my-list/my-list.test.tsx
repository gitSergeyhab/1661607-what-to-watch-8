import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import MyList from './my-list';
import { renderComponent } from '../../util/test-utils';
import { MockState, ScreenText } from '../../util/test-const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);


describe ('MyList Component', () => {
  it('should render correctly', () => {

    const state = {...MockState.FilledOk};
    const store = mockStore(state);
    renderComponent(<MyList/>, store, history);

    expect(screen.queryAllByRole('article').length).toBe(state.FavoriteData.favorites.length);
    expect(screen.queryByText(ScreenText.MyList.Filled.Header)).toBeInTheDocument();
  });

  it('should render Spinner when loading', () => {

    const state = {...MockState.FilledOk, FavoriteData: {...MockState.FilledOk.FavoriteData, areFavoritesLoaded: false}};
    const store = mockStore(state);
    renderComponent(<MyList/>, store, history);

    expect(screen.queryByText(ScreenText.Spinner)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.MyList.Filled.Header)).not.toBeInTheDocument();
    expect(screen.queryAllByRole('article').length).toBe(0);
  });

  it('should render NotFoundPage when favorite error', () => {

    const state = {...MockState.FilledOk, ErrorStatus: {favorite: true}};
    const store = mockStore(state);
    renderComponent(<MyList/>, store, history);

    expect(screen.queryByText(ScreenText.Page404.Link)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.MyList.Filled.Header)).not.toBeInTheDocument();
    expect(screen.queryAllByRole('article').length).toBe(0);
  });
});

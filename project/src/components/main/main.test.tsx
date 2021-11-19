
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Main from './main';
import { renderComponent } from '../../util/test-utils';
import { MockState, ScreenText } from '../../util/test-const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

describe ('Main Component', () => {
  it('should render correctly', () => {
    const state = {...MockState.FilledOk};
    const store = mockStore(state);
    renderComponent(<Main authorizationStatus/>, store, history);

    expect(screen.queryByText(ScreenText.Main.Play)).toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Main.AllGenres)).toBeInTheDocument();
  });

  it('should render Spinner when loading', () => {
    const state = {...MockState.FilledOk, MainData: {...MockState.FilledOk.MainData, areFilmsLoaded: false}};
    const store = mockStore(state);
    renderComponent(<Main authorizationStatus/>, store, history);

    expect(screen.queryByText(ScreenText.Spinner)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Main.Play)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Main.AllGenres)).not.toBeInTheDocument();
  });

  it('should render NotFoundPage when main error', () => {
    const state = {...MockState.FilledOk, ErrorStatus: {main: true}};
    const store = mockStore(state);
    renderComponent(<Main authorizationStatus/>, store, history);

    expect(screen.queryByText(ScreenText.Page404.Link)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Main.Play)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Main.AllGenres)).not.toBeInTheDocument();
  });

  it('should render Main when promo===null without promo', () => {
    const state = {...MockState.FilledOk, MainData: {...MockState.FilledOk.MainData, promo: null}};
    const store = mockStore(state);
    renderComponent(<Main authorizationStatus/>, store, history);

    expect(screen.queryByText(ScreenText.Main.Play)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Main.AllGenres)).toBeInTheDocument();
  });

});

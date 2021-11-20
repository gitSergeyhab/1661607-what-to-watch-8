import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Player from './player';
import { renderComponent } from '../../util/test-utils';
import userEvent from '@testing-library/user-event';
import { MockState, ScreenText } from '../../util/test-const';


const Path = {
  First: '/films/2',
  Last: '/player/2',
};

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

describe ('Player Component', () => {
  it('should render correctly', () => {

    const state = {...MockState.FilledOk};
    const store = mockStore(state);
    renderComponent(<Player/>, store, history);

    expect(screen.queryByText(ScreenText.Player.Exit)).toBeInTheDocument();
    expect(screen.queryByText(state.MovieData.movie.name)).toBeInTheDocument();
  });

  it('should rout back when click EXIT', () => {

    const state = {...MockState.FilledOk};
    const store = mockStore(state);
    history.push(Path.First);
    renderComponent(<Player/>, store, history);

    expect(history.location.pathname).toBe(Path.First);

    history.push(Path.Last);

    expect(history.location.pathname).toBe(Path.Last);

    const btn = screen.getByText(ScreenText.Player.Exit);

    userEvent.click(btn);

    expect(history.location.pathname).toBe(Path.First);
  });

  it('should render DummyPlayer when movie===null', () => {

    const state = {...MockState.FilledOk, MovieData: {...MockState.FilledOk.MovieData, movie: null}};
    const store = mockStore(state);
    history.push(Path.First);
    renderComponent(<Player/>, store, history);

    expect(screen.queryByText(ScreenText.Player.Dummy)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Player.Exit)).toBeInTheDocument();
  });

  it('should render NotFoundPage when movie error', () => {

    const state = {...MockState.FilledOk, ErrorStatus: {movie: true}};
    const store = mockStore(state);
    renderComponent(<Player/>, store, history);

    expect(screen.queryByText(ScreenText.Page404.Link)).toBeInTheDocument();

    expect(screen.queryByText(ScreenText.Player.Dummy)).not.toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Player.Exit)).not.toBeInTheDocument();
    expect(screen.queryByText(state.MovieData.movie.name)).not.toBeInTheDocument();
  });
});

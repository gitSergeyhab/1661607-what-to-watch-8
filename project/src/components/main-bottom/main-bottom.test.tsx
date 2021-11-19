
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import MainBottom from './main-bottom';
import { renderComponent } from '../../util/test-utils';
import { MockState, ScreenText } from '../../util/test-const';
import { makeFakeFilmList } from '../../util/test-mocks';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const films = makeFakeFilmList();


describe ('MainBottom Component', () => {
  it('should render correctly', () => {
    const state = {...MockState.FilledOk};
    const store = mockStore(state);
    renderComponent(<MainBottom films={films}/>, store, history);

    expect(screen.queryByText(ScreenText.Main.AllGenres)).toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Main.ShowMore)).toBeInTheDocument();
  });

  it('should render correctly after btnShowMore click', () => {
    const state = {...MockState.FilledOk};
    const store = mockStore(state);
    renderComponent(<MainBottom films={films}/>, store, history);

    const btn = screen.getByText(ScreenText.Main.ShowMore);
    expect(btn).toBeInTheDocument();

    userEvent.click(btn);

    expect(screen.queryByText(ScreenText.Main.ShowMore)).not.toBeInTheDocument();
  });
});

import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';

import { MockState, ScreenText, TEST_ID } from '../../../util/test-const';
import { createMemoryHistory } from 'history';
import { renderComponent } from '../../../util/test-utils';
import { AppRoute } from '../../../const';
import BtnPlayer from './btn-player';


const state = {...MockState.FilledOk};
const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(state);

describe('BtnPlayer Component', () => {
  it('should render correctly', () => {

    renderComponent(<BtnPlayer id={+TEST_ID}/>, store, history);

    expect(screen.getByText(ScreenText.Movie.All.Play)).toBeInTheDocument();
  });

  it ('should push to Player when click btn', () => {

    const firstPath = AppRoute.Main;
    const lastPath = `/player/${TEST_ID}`;
    history.push(firstPath);

    renderComponent(<BtnPlayer id={+TEST_ID}/>, store, history);

    const btn = screen.getByText(ScreenText.Movie.All.Play);

    expect(history.location.pathname).toBe(firstPath);

    userEvent.click(btn);

    expect(history.location.pathname).toBe(lastPath);
  });
});

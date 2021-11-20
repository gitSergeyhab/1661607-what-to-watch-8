import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';

import NotFoundPage from './not-found-page';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import { MockState, ScreenText } from '../../util/test-const';
import { renderComponent } from '../../util/test-utils';


const FIRST_PATH = '/films/1';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const state = {...MockState.FilledOk};
const store = mockStore(state);

describe('NotFoundPage Component', () => {
  it('should render correctly', () => {
    renderComponent(<NotFoundPage authorizationStatus/>, store, history);

    expect(screen.getByText(ScreenText.Page404.Link)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Page404.Message)).toBeInTheDocument();
  });

  it('should rout to Main when click link', () => {

    history.push(FIRST_PATH);
    renderComponent(<NotFoundPage authorizationStatus/>, store, history);

    expect(history.location.pathname).toBe(FIRST_PATH);

    const link = screen.getByText(ScreenText.Page404.Link);

    userEvent.click(link);

    expect(history.location.pathname).toBe(AppRoute.Main);
  });
});


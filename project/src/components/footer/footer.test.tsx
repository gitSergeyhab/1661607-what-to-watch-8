import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Footer from './footer';
import { renderComponent } from '../../util/test-utils';
import { MockState, ScreenText } from '../../util/test-const';
import { AppRoute } from '../../const';


const firstPath = '/films/1';
const state = {...MockState.FilledOk};
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(state);

describe('Footer Component', () => {
  it('should render correctly', () => {

    renderComponent(<Footer/>, store, history);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Footer)).toBeInTheDocument();
  });

  it('should link correctly', () => {
    history.push(firstPath);

    renderComponent(<Footer/>, store, history);

    expect(history.location.pathname).toBe(firstPath);
    const link = screen.getByRole('link');

    userEvent.click(link);

    expect(history.location.pathname).toBe(AppRoute.Main);
  });
});

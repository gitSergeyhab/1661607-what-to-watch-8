import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Logo from './logo';
import { renderComponent } from '../../../../util/test-utils';
import { AppRoute } from '../../../../const';
import { MockState } from '../../../../util/test-const';


const firstPath = '/films/1';

const state = {...MockState.FilledOk};
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(state);


describe('Logo Component', () => {
  it('should render correctly', () => {

    renderComponent(<Logo/>, store, history);

    expect(screen.getByText('T')).toBeInTheDocument();
    expect(screen.getAllByText('W').length).toBe(2);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should link correctly', () => {

    history.push(firstPath);
    renderComponent(<Logo/>, store, history);

    expect(history.location.pathname).toBe(firstPath);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    expect(history.location.pathname).toBe(AppRoute.Main);
  });
});

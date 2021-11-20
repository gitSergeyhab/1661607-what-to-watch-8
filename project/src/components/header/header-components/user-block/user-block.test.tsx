import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import UserBlock from './user-block';
import { renderComponent } from '../../../../util/test-utils';
import { logoutAction } from '../../../../store/api-actions';
import { MockState, ScreenText } from '../../../../util/test-const';


const state = {...MockState.FilledOk};
const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(state);

const userBlock = <UserBlock authorizationStatus/>;

describe('Logo Component', () => {
  it('should render correctly', () => {

    renderComponent(userBlock, store, history);

    expect(screen.getByText(ScreenText.Header.SignOut)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should dispatch logoutAction when SignOut click', () => {

    renderComponent(userBlock, store, history);

    const btnSignOut = screen.getByText(ScreenText.Header.SignOut);
    expect(store.getActions()).toEqual([]);

    userEvent.click(btnSignOut);

    setTimeout(() => expect(store.getActions()).toEqual([logoutAction()]), 0);
  });
});

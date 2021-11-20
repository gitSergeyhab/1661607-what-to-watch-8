import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import SignIn from './sign-in';
import { renderComponent } from '../../util/test-utils';
import { MockState, ScreenText } from '../../util/test-const';
import { loginAction } from '../../store/api-actions';


const state = {...MockState.EmptyNoAuth};
const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(state);

const loginForm = <SignIn authorizationStatus={false}/>;

const TestAuth = {
  Email: 'test-email@mail.com',
  Password: 'test-pa5Sword',
};

describe('SignIn Component', () => {
  it('should render correctly', () => {
    renderComponent(loginForm, store, history);

    expect(screen.queryByPlaceholderText(ScreenText.Login.Email)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(ScreenText.Login.Password)).toBeInTheDocument();
    expect(screen.queryByLabelText(ScreenText.Login.Email)).toBeInTheDocument();
  });

  it('should input correctly and dispatch loginAction', () => {

    renderComponent(loginForm, store, history);

    expect(store.getActions()).toEqual([]);

    const submit = screen.getByRole('button');

    userEvent.click(submit);

    expect(store.getActions()).toEqual([]);

    const email = screen.getByPlaceholderText(ScreenText.Login.Email);
    const password = screen.getByPlaceholderText(ScreenText.Login.Password);

    userEvent.type(email, TestAuth.Email);
    userEvent.click(submit);

    expect(store.getActions()).toEqual([]);

    userEvent.type(password, TestAuth.Password);
    userEvent.click(submit);

    setTimeout(() => {
      expect(store.getActions()).toEqual([loginAction({email: TestAuth.Email, password: TestAuth.Password})]);
    }, 0);
  });
});

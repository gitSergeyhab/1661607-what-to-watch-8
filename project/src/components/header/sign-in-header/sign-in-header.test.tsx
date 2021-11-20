import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import SignInHeader from './sign-in-header';
import { renderComponent } from '../../../util/test-utils';
import { MockState, ScreenText } from '../../../util/test-const';


const state = {...MockState.FilledOk};
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(state);

describe('SignInHeader Component', () => {
  it('should render correctly', () => {

    renderComponent(<SignInHeader/>, store, history);

    expect(screen.getByText('T')).toBeInTheDocument();
    expect(screen.getAllByText('W').length).toBe(2);
    expect(screen.getByText(ScreenText.Header.SignIn)).toBeInTheDocument();
  });
});

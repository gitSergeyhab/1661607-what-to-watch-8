import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import MyList from '../my-list/my-list';
import PrivateRoute from './private-route';
import { renderComponent } from '../../util/test-utils';
import { MockState, ScreenText } from '../../util/test-const';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

const privateComponent = <MyList/>;


describe ('PrivateRoute', () => {
  it ('should render component when AUTH', () => {
    const state = {...MockState.FilledOk};
    const store = mockStore(state);
    const privateRoute = <PrivateRoute privateComponent={privateComponent} authorizationStatus/>;
    renderComponent(privateRoute, store, history);

    expect(screen.queryAllByRole('article').length).toBe(state.FavoriteData.favorites.length);
    expect(screen.getByText(ScreenText.Main.MyList)).toBeInTheDocument();

    expect(screen.queryByPlaceholderText(ScreenText.Login.Email)).not.toBeInTheDocument();

  });

  it ('should redirect to SignIn when NO AUTH', () => {
    const state = {...MockState.EmptyNoAuth};
    const store = mockStore(state);
    const privateRoute = <PrivateRoute privateComponent={privateComponent} authorizationStatus={false}/>;
    renderComponent(privateRoute, store, history);
    setTimeout(() => {
      expect(screen.getByPlaceholderText(ScreenText.Login.Email)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(ScreenText.Login.Password)).toBeInTheDocument();

      expect(screen.queryByText(ScreenText.Main.MyList)).not.toBeInTheDocument();
    }, 0);

  });
});

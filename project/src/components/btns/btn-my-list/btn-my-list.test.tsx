import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';

import BtnMyList from './btn-my-list';
import { MockState, ScreenText, TEST_ID } from '../../../util/test-const';
import { renderComponent } from '../../../util/test-utils';
import { AppRoute, BtnLocation } from '../../../const';


const state = {...MockState.FilledOk};
const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(state);

describe('BtnMyList Component', () => {
  it('should render correctly', () => {

    const myList = <BtnMyList authorizationStatus id={+TEST_ID} isFavorite location={BtnLocation.Promo}/>;

    renderComponent(myList, store, history);

    expect(screen.getByText(ScreenText.Movie.All.MyList)).toBeInTheDocument();
  });

  it ('should push to SignIn when authorizationStatus: false', () => {
    const myList = <BtnMyList authorizationStatus={false} id={+TEST_ID} isFavorite location={BtnLocation.Promo}/>;

    const noAuthStore = mockStore({...state, UserData: {authorizationStatus: false}});

    const firstPath = AppRoute.Main;
    const lastPath = AppRoute.SignIn;
    history.push(firstPath);

    renderComponent(myList, noAuthStore, history);

    const btn = screen.getByText(ScreenText.Movie.All.MyList);

    expect(history.location.pathname).toBe(firstPath);

    userEvent.click(btn);

    expect(history.location.pathname).toBe(lastPath);
  });
});

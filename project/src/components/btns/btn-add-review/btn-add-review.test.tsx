import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';

import BtnAddReview from './btn-add-review';
import { MockState, ScreenText, TEST_ID } from '../../../util/test-const';
import { renderComponent } from '../../../util/test-utils';

const Path = {
  Films: '/films',
  Review: '/review',
};

const state = {...MockState.FilledOk};
const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(state);

describe('BtnAddReview Component', () => {
  it('should render correctly', () => {

    renderComponent(<BtnAddReview id={TEST_ID}/>, store, history);
    expect(screen.getByText(ScreenText.Movie.Auth.AddReview)).toBeInTheDocument();
  });

  it ('should push to addReview', () => {

    const firstPath = `${Path.Films}/${TEST_ID}`;
    const lastPath = `${Path.Films}/${TEST_ID}${Path.Review}`;
    history.push(firstPath);

    renderComponent(<BtnAddReview id={TEST_ID}/>, store, history);
    const btn = screen.getByText(ScreenText.Movie.Auth.AddReview);
    expect(history.location.pathname).toBe(firstPath);
    userEvent.click(btn);
    expect(history.location.pathname).toBe(lastPath);
  });
});

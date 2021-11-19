import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import AddReviewHeader from './add-review-header';
import { renderComponent } from '../../../util/test-utils';
import { MockState, ScreenText, TEST_ID } from '../../../util/test-const';
import { makeFakeFilm } from '../../../util/test-mocks';


const LINK_TEST_ID = 'link-film-name';

const state = {...MockState.FilledOk};
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(state);

const film = {...makeFakeFilm(), id: +TEST_ID};


const addReviewHeader = <AddReviewHeader authorizationStatus film={film} />;
describe('AddReviewHeader Component', () => {
  it('should render correctly', () => {

    renderComponent(addReviewHeader, store, history);

    expect(screen.getByText(ScreenText.AddReview.Title)).toBeInTheDocument();
    expect(screen.getByText(film.name)).toBeInTheDocument();

  });

  it('should link correctly', () => {

    renderComponent(addReviewHeader, store, history);

    const link = screen.getByTestId(LINK_TEST_ID);
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    expect(history.location.pathname).toBe(`/films/${film.id}`);
  });
});

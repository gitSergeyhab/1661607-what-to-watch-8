import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import FilmCard from './film-card';
import { renderComponent } from '../../util/test-utils';
import { makeFakeFilm } from '../../util/test-mocks';
import { MockState, TEST_ID } from '../../util/test-const';
import { AppRoute} from '../../const';

const state = {...MockState.FilledOk};
const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(state);

const film = {...makeFakeFilm(), id: +TEST_ID};

const card = <FilmCard film={film}/>;

describe('CommentForm Component', () => {
  it('should render correctly', () => {
    renderComponent(card, store, history);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.queryByText(film.name)).toBeInTheDocument();
    expect(screen.queryByAltText(film.name)).toBeInTheDocument();
  });

  it('should link correctly', () => {

    history.push(AppRoute.Main);
    renderComponent(card, store, history);

    expect(history.location.pathname).toBe(AppRoute.Main);

    userEvent.click(screen.getByRole('link'));

    expect(history.location.pathname).toBe(`/films/${TEST_ID}`);
  });
});

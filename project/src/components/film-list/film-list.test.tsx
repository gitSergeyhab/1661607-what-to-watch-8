import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import FilmList from './film-list';
import { makeFakeFilmList } from '../../util/test-mocks';
import { renderComponent } from '../../util/test-utils';
import { MockState } from '../../util/test-const';


const films = makeFakeFilmList();

const state = {...MockState.FilledOk};
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(state);

describe('FilmList Component', () => {
  it('should render correctly', () => {
    renderComponent(<FilmList films={films}/>, store, history);
    expect(screen.getAllByRole('article').length).toBe(films.length);
    expect(screen.getByText(films[0].name)).toBeInTheDocument();
  });
});

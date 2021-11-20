import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import MediaElement from './media-element';
import { renderComponent } from '../../util/test-utils';
import { makeFakeFilm } from '../../util/test-mocks';
import { MockState } from '../../util/test-const';


const TEST_ID_VIDEO = 'card-video';
const film = makeFakeFilm();

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe ('Main Component', () => {
  it('should render correctly', () => {
    const state = {...MockState.FilledOk};
    const store = mockStore(state);
    renderComponent(<MediaElement film={film}/>, store, history);

    expect(screen.queryByRole('article')).toBeInTheDocument();
    expect(screen.queryByAltText(film.name)).toBeInTheDocument();
  });

  it('should render correctly when hover', () => {
    const state = {...MockState.FilledOk};
    const store = mockStore(state);
    renderComponent(<MediaElement film={film}/>, store, history);

    const card = screen.getByRole('article');

    expect(screen.queryByAltText(film.name)).toBeInTheDocument();
    expect(screen.queryByTestId(TEST_ID_VIDEO)).not.toBeInTheDocument();

    userEvent.hover(card);

    setTimeout(() => {
      expect(screen.queryByAltText(film.name)).not.toBeInTheDocument();
      expect(screen.queryByTestId(TEST_ID_VIDEO)).toBeInTheDocument();
    }, 2000);
  });
});

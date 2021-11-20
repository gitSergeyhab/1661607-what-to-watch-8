
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import MainGenres from './main-genres';
import { renderComponent } from '../../util/test-utils';
import { MockState, ScreenText } from '../../util/test-const';
import { makeFakeFilmList } from '../../util/test-mocks';


const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const films = makeFakeFilmList();
const genre = films[0].genre;

const onClick = jest.fn();
const mainGenres = <MainGenres selectedGenre={genre} onClick={onClick}/>;

describe ('MainGenres Component', () => {
  it('should render correctly', () => {

    const state = {...MockState.FilledOk};
    const store = mockStore(state);
    renderComponent(mainGenres, store, history);

    expect(screen.queryByText(ScreenText.Main.AllGenres)).toBeInTheDocument();
  });
});

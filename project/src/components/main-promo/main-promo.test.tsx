
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import MainPromo from './main-promo';
import { renderComponent } from '../../util/test-utils';
import { makeFakeFilm } from '../../util/test-mocks';
import { MockState, ScreenText } from '../../util/test-const';


const history = createMemoryHistory();
const mockStore = configureMockStore();

const film = makeFakeFilm();

const mainPromo = <MainPromo authorizationStatus promo={film}/>;

describe ('MainPromo Component', () => {
  it('should render correctly', () => {
    const state = {...MockState.FilledOk};
    const store = mockStore(state);
    renderComponent(mainPromo, store, history);

    expect(screen.queryByText(ScreenText.Main.Play)).toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Main.MyList)).toBeInTheDocument();
    expect(screen.queryByText(film.genre)).toBeInTheDocument();
    expect(screen.queryByText(film.name)).toBeInTheDocument();
  });
});

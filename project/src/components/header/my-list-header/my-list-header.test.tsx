import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

import MyListHeader from './my-list-header';
import { renderComponent } from '../../../util/test-utils';
import { MockState, ScreenText } from '../../../util/test-const';


const state = {...MockState.FilledOk};
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(state);

describe('MyListHeader Component', () => {
  it('should render correctly', () => {

    renderComponent(<MyListHeader/>, store, history);

    expect(screen.getByText(ScreenText.Movie.All.MyList)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Header.SignOut)).toBeInTheDocument();
  });
});

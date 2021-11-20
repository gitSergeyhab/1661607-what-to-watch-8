import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import Spinner from './spinner';
import { MockState, ScreenText } from '../../util/test-const';
import { renderComponent } from '../../util/test-utils';

const state = {...MockState.EmptyNoAuth};
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(state);

describe('Spinner Component', () => {
  it ('should render correctly', () => {

    renderComponent(<Spinner/>, store, history);

    expect(screen.getByText(ScreenText.Spinner)).toBeInTheDocument();
  });
});

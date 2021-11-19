import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';

import BtnShowMore from './btn-show-more';
import { MockState, ScreenText } from '../../../util/test-const';
import { createMemoryHistory } from 'history';
import { renderComponent } from '../../../util/test-utils';


const state = {...MockState.FilledOk};
const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(state);


describe('BtnShowMore Component', () => {
  it('should render correctly', () => {
    const onTestClick = jest.fn();

    renderComponent(<BtnShowMore onClick={onTestClick}/>, store, history);

    expect(screen.getByText(ScreenText.Main.ShowMore)).toBeInTheDocument();
  });
});

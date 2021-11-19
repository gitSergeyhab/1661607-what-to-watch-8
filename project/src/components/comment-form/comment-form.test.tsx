import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import CommentForm from './comment-form';
import { renderComponent } from '../../util/test-utils';
import { MockState, ScreenText, TEST_ID } from '../../util/test-const';
import { ReviewLength, STARS_COUNT } from '../../const';
import { postReviewAction } from '../../store/api-actions';


const testText = {
  ok: new Array(ReviewLength.Min + 1).fill('x').join(''),
  tooSmall: new Array(ReviewLength.Min - 1).fill('x').join(''), // на символ меньше минимального -> disabled=true
  addToOk: 'ok', // -> disabled=false
  addToTooBig: new Array(ReviewLength.Max).fill('x').join(''), //-> disabled=true
};

const displayTestComment = new RegExp(testText.tooSmall, 'i');


const state = {...MockState.FilledOk};
const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore(state);

const commentForm = <CommentForm id={TEST_ID}/>;

describe('CommentForm Component', () => {
  it('should render correctly', () => {
    renderComponent(commentForm, store, history);

    expect(screen.queryByText(ScreenText.AddReview.Post)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(ScreenText.AddReview.Placeholder)).toBeInTheDocument();
  });

  it('should input and checked correctly', () => {

    renderComponent(commentForm, store, history);

    //button - before
    const submitBtn = screen.getByRole('button');
    expect(submitBtn).toHaveAttribute('disabled');

    //textarea
    expect(screen.queryByDisplayValue(displayTestComment)).not.toBeInTheDocument();

    userEvent.type(screen.getByPlaceholderText(ScreenText.AddReview.Placeholder), testText.tooSmall);

    expect(screen.queryByDisplayValue(displayTestComment)).toBeInTheDocument();

    //stars
    const radioButtons = screen.queryAllByRole('radio');
    const lastBtn = radioButtons[STARS_COUNT - 1];
    expect(lastBtn).toBeInTheDocument();
    expect(lastBtn).not.toBeChecked();

    userEvent.click(lastBtn);

    expect(lastBtn).toBeChecked();

    //button - after
    expect(submitBtn).toHaveAttribute('disabled');

    userEvent.type(screen.getByPlaceholderText(ScreenText.AddReview.Placeholder), testText.addToOk);

    expect(submitBtn).not.toHaveAttribute('disabled');

    userEvent.type(screen.getByPlaceholderText(ScreenText.AddReview.Placeholder), testText.addToTooBig);

    expect(submitBtn).toHaveAttribute('disabled');
  });

  it('should dispatch postReviewAction when click submit', () => {

    renderComponent(commentForm, store, history);

    userEvent.type(screen.getByPlaceholderText(ScreenText.AddReview.Placeholder), testText.ok);
    const radioButtons = screen.queryAllByRole('radio');
    const lastBtn = radioButtons[STARS_COUNT - 1];
    userEvent.click(lastBtn);

    expect(store.getActions()).toEqual([]);

    userEvent.click(screen.getByRole('button'));

    const params = {
      id: state.MovieData.movie.id.toString(),
      comment: testText.ok,
      rating: STARS_COUNT,
      unBlock: jest.fn(),
      push: jest.fn(),
    };

    setTimeout(() => expect(store.getActions()).toEqual([postReviewAction(params)]), 0);
  });
});

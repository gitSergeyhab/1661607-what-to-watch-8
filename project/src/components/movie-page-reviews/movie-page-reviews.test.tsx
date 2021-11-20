import { render, screen } from '@testing-library/react';

import MoviePageReviews from './movie-page-reviews';
import { makeFakeCommentList } from '../../util/test-mocks';
import { ScreenText } from '../../util/test-const';


const DATA_TEST_ID = 'reviews';
const comments = makeFakeCommentList();

describe ('MoviePageReviews Component', () => {
  it('should render correctly', () => {

    render(<MoviePageReviews reviews={comments}/>);

    expect(screen.queryByTestId(DATA_TEST_ID)).toBeInTheDocument();
  });

  it('should render correctly when no comment', () => {

    render(<MoviePageReviews reviews={[]}/>);

    expect(screen.queryByText(ScreenText.Tab.Reviews)).toBeInTheDocument();
  });
});

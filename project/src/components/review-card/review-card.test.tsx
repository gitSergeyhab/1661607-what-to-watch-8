import { render, screen } from '@testing-library/react';
import ReviewCard from './review-card';
import { makeFakeComment } from '../../util/test-mocks';


const comment = makeFakeComment();
describe('ReviewCard Component', () => {
  it ('should render correctly', () => {

    render(<ReviewCard review={comment}/>);

    expect(screen.getByText(comment.user.name)).toBeInTheDocument();
    expect(screen.getByText(comment.comment)).toBeInTheDocument();
  });
});

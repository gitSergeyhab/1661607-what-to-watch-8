import { render, screen } from '@testing-library/react';
import CommentFormTextarea from './comment-form-textarea';
import { ScreenText } from '../../util/test-const';


const TEST_COMMENT = 'TEST_COMMENT';
const onTestChange = jest.fn();

const commentForm = <CommentFormTextarea comment={TEST_COMMENT} disabled={false} onChange={onTestChange}/>;

describe('CommentFormTextarea Component', () => {
  it('should render correctly', () => {
    render(commentForm);

    expect(screen.getByText(TEST_COMMENT)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(ScreenText.AddReview.Placeholder)).toBeInTheDocument();
  });
});

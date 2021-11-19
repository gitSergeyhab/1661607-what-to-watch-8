
import { render, screen } from '@testing-library/react';
import CommentFormStars from './comment-form-stars';
import { STARS_COUNT } from '../../const';


const STAR = 6;
const onTestChange = jest.fn();

const commentForm = <CommentFormStars starsCount={STAR} disabled={false} onChange={onTestChange}/>;

describe('CommentFormStars Component', () => {
  it('should render correctly', () => {
    render(commentForm);

    const radios = screen.getAllByRole('radio');
    expect(radios.length).toBe(STARS_COUNT);
    expect(radios[0]).not.toBeChecked();
    expect(radios[STARS_COUNT- STAR]).toBeChecked();
  });
});

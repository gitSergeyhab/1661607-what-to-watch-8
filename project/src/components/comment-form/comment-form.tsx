import { ChangeEvent, FormEvent, useState } from 'react';
import CommentFormStars from '../comment-form-stars/comment-form-stars';
import {disableReviewBtn} from '../../util/util';
import CommentFormTextarea from '../comment-form-textarea/comment-form-textarea';
import { useDispatch } from 'react-redux';
import { postReviewAction } from '../../store/api-action';


function CommentForm({id}: {id: string}): JSX.Element {

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isFormBlocked, setFormBlock] = useState(false);

  const clearReview = () => {
    setComment('');
    setRating(0);
  };

  const dispatch = useDispatch();

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    setFormBlock(true);
    dispatch(postReviewAction({id, rating, comment, unBlock: () => setFormBlock(false), clear: clearReview}));
  };

  const handleTextareaInput = (evt: FormEvent<HTMLTextAreaElement>) => setComment(evt.currentTarget.value);

  const handleStarClick = (evt: ChangeEvent<HTMLInputElement>) => setRating(+evt.currentTarget.value);

  return (
    <form
      action="#" className="add-review__form"
      onSubmit={handleFormSubmit}
    >
      <CommentFormStars starsCount={rating} onChange={handleStarClick} disabled={isFormBlocked} />

      <div className="add-review__text">

        <CommentFormTextarea comment={comment} onChange={handleTextareaInput} disabled={isFormBlocked}/>

        <div className="add-review__submit">
          <button className="add-review__btn" type="submit"
            disabled={isFormBlocked || disableReviewBtn(comment, rating)}
          >Post
          </button>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;

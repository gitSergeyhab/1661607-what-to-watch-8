import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import CommentFormStars from '../comment-form-stars/comment-form-stars';
import CommentFormTextarea from '../comment-form-textarea/comment-form-textarea';
import { disableReviewBtn } from '../../util/util';
import { usePostReviewMutation } from '../../services/query-api';
import { toast } from 'react-toastify';
import { ErrorMessage } from '../../const';


const FILMS_PATH = '/films/';


function CommentForm({id}: {id: string}): JSX.Element {

  const history = useHistory();

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isFormBlocked, setFormBlock] = useState(false);

  useEffect(() => function cleanup() {
    setComment('');
    setRating(0);
    setFormBlock(false);
  }, []);


  const [postReview] = usePostReviewMutation();

  const handleFormSubmit = async(evt: FormEvent) => {
    evt.preventDefault();
    setFormBlock(true);
    try {
      await postReview({body: {rating, comment}, id}).unwrap();
      history.push(`${FILMS_PATH}${id}`);
    } catch {
      setFormBlock(false);
      toast.warn(ErrorMessage.PostComment);
    }
  };

  const handleTextareaInput =  (evt: FormEvent<HTMLTextAreaElement>) => setComment(evt.currentTarget.value);
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

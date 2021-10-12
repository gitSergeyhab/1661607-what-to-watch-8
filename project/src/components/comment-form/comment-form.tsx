import { useState } from 'react';
import {disableReviewBtn} from '../../util';

const STARS_COUNT = 10;


function Star({score, stateScore, onChange}: {score: number, stateScore: number, onChange: ()=>void}): JSX.Element {

  const id = `star-${score}`;

  return (
    <>
      <input
        onChange={onChange}
        checked={stateScore === score}
        className="rating__input" id={id} type="radio" name="rating" value={score}
      />
      <label className="rating__label" htmlFor={id}>Rating {score}</label>
    </>
  );
}

function CommentForm(): JSX.Element {

  const [comment, setComment] = useState('');
  const [starsCount, setStarsCount] = useState(0);

  return (
    <form
      action="#" className="add-review__form"
      onSubmit={(evt) => {
        evt.preventDefault();
        setComment('');
        setStarsCount(0);
      }}
    >
      <div className="rating">
        <div className="rating__stars">

          {new Array(10).fill(null).map((el, i) => (
            <Star
              onChange={() => setStarsCount(STARS_COUNT-i)}
              stateScore={starsCount}
              score={STARS_COUNT-i}
              key={(STARS_COUNT-i).toString()}
            />))}

        </div>
      </div>

      <div className="add-review__text">
        <textarea
          onChange={(evt) => {
            evt.preventDefault();
            setComment(evt.target.value);
          }}
          value={comment}
          className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={disableReviewBtn(comment, starsCount)}>Post</button>
        </div>

      </div>
      comment: {comment}. Stars: {starsCount}
    </form>
  );
}

export default CommentForm;

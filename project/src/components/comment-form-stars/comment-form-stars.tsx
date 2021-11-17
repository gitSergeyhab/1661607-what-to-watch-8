import { ChangeEventHandler } from 'react';

const STARS_COUNT = 10;
type StarsProps = {starsCount: number, disabled: boolean, onChange: ChangeEventHandler<HTMLInputElement>}


function Star({score, disabled, starsCount, onChange}: StarsProps & {score: number}): JSX.Element {

  const id = `star-${score}`;

  return (
    <>
      <input
        disabled={disabled}
        onChange={onChange}
        checked={starsCount === score}
        value={score}
        className="rating__input" id={id} type="radio" name="rating"
      />
      <label className="rating__label" htmlFor={id}>Rating {score}</label>
    </>
  );
}

function CommentFormStars({starsCount, disabled, onChange} : StarsProps): JSX.Element {

  return (
    <div className="rating">
      <div className="rating__stars">

        {new Array(STARS_COUNT).fill(null).map((el, i) => (
          <Star
            disabled={disabled}
            onChange={onChange}
            starsCount={starsCount}
            score={STARS_COUNT-i}
            key={(STARS_COUNT-i).toString()}
          />))}

      </div>
    </div>

  );
}

export default CommentFormStars;

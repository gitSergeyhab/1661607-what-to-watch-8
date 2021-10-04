import { Film } from '../../types/types';

import {AddReviewHeader} from '../header/header';


const STARS_COUNT = 10;

function Star({score}: {score: string}): JSX.Element {
  return (
    <>
      <input className="rating__input" id={`star-${score}`} type="radio" name="rating" value={score}/>
      <label className="rating__label" htmlFor={`star-${score}`}>Rating {score}</label>
    </>
  );
}


function AddReview({film}: {film: Film}): JSX.Element {

  const {name, backgroundImage, posterImage} = film;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <AddReviewHeader/>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">

              {new Array(10).fill(null).map((el, i) => <Star score={(STARS_COUNT-i).toString()} key={(STARS_COUNT-i).toString()} />)}

            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
}

export default AddReview;

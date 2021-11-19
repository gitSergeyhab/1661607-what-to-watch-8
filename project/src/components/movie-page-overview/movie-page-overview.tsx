
import { getScoreDescription } from '../../util/util';
import { Film } from '../../types/types';


function MoviePageOverview({film}: {film: Film}): JSX.Element {

  const {rating, scoresCount, description, director, starring} = film;

  const ratingDescription = getScoreDescription(rating);
  const actors = starring.join(', ');

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{ratingDescription}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {actors}</strong></p>
      </div>
    </>
  );
}

export default MoviePageOverview;

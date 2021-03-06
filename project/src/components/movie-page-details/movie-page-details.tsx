import { Film } from '../../types/types';
import { getTimeInHoursAndMinutes } from '../../util/util';


function StarInLine({star}: {star: string}) {
  return <>{star},<br /></>;
}

function MoviePageDetails({film}: {film: Film}): JSX.Element {

  const {released, runTime, genre, director, starring} = film;

  const actors = starring.map((star) => <StarInLine star={star} key={star}/>);
  const displayTime = getTimeInHoursAndMinutes(runTime);

  return (

    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {actors}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">
            {displayTime}
          </span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">
            {genre}
          </span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">
            {released}
          </span>
        </p>
      </div>
    </div>
  );
}

export default MoviePageDetails;

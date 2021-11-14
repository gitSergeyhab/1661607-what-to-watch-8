import { useParams } from 'react-router';
import { Film } from '../../types/types';

import CommentForm from '../comment-form/comment-form';
import NotFoundPage from '../not-found-page/not-found-page';
import { AuthorizationStatus } from '../../const';
import AddReviewHeader from '../header/add-review-header/add-review-header';
/* eslint-disable no-console */


function AddReview({films, authorizationStatus}: {films: Film[], authorizationStatus: AuthorizationStatus}): JSX.Element {


  const {id}: {id: string} = useParams();

  const theFilm = films.find((film) => film.id === +id);

  if (!theFilm) {
    return <NotFoundPage authorizationStatus={authorizationStatus}/>;
  }
  const {name, backgroundImage, posterImage} = theFilm;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <AddReviewHeader authorizationStatus={authorizationStatus} film={theFilm}/>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">

        <CommentForm/>

      </div>

    </section>
  );
}

export default AddReview;

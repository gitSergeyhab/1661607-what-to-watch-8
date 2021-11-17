import { useParams } from 'react-router';

import CommentForm from '../comment-form/comment-form';
import NotFoundPage from '../not-found-page/not-found-page';
import AddReviewHeader from '../header/add-review-header/add-review-header';
import { useDispatch, useSelector } from 'react-redux';
import { getMovie } from '../../store/movie-data/movie-data-selectors';
import { useEffect } from 'react';
import { fetchMovieAction } from '../../store/api-action';
import { getMovieErrorStatus } from '../../store/error-status/error-status-selectors';
import Spinner from '../spinner/spinner';
/* eslint-disable no-console */


function AddReview({authorizationStatus}: {authorizationStatus: boolean}): JSX.Element {


  const {id}: {id: string} = useParams();

  const film = useSelector(getMovie);
  const error = useSelector(getMovieErrorStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieAction(id));
  }, [dispatch, id]);

  if (error) {
    return <NotFoundPage authorizationStatus={authorizationStatus}/>;
  }

  if (!film) {
    return <Spinner/>;
  }

  const {name, backgroundImage, posterImage} = film;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <AddReviewHeader authorizationStatus={authorizationStatus} film={film}/>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">

        <CommentForm id={id}/>

      </div>

    </section>
  );
}

export default AddReview;

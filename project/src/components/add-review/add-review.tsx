import { useParams } from 'react-router';

import AddReviewHeader from '../header/add-review-header/add-review-header';
import CommentForm from '../comment-form/comment-form';
import NotFoundPage from '../not-found-page/not-found-page';
import Spinner from '../spinner/spinner';
import { useGetOneFilmQuery } from '../../services/query-api';
import { adaptFilmToClient } from '../../services/adapters';


function AddReview({authorizationStatus}: {authorizationStatus: boolean}): JSX.Element {

  const {id}: {id: string} = useParams();

  const {data, isFetching, isError} = useGetOneFilmQuery(id);

  if (isError) {
    return <NotFoundPage authorizationStatus={authorizationStatus}/>;
  }

  if (!data || isFetching) {
    return <Spinner/>;
  }

  const film = adaptFilmToClient(data);
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

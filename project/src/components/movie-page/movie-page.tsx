import { useParams} from 'react-router-dom';

import BtnMyList from '../btns/btn-my-list/btn-my-list';
import BtnPlayer from '../btns/btn-player/btn-player';
import BtnAddReview from '../btns/btn-add-review/btn-add-review';
import Footer from '../footer/footer';
import MainHeader from '../header/main-header/main-header';
import MoviePageSimilar from '../movie-page-similar/movie-page-similar';
import MoviePageInfoBlock from '../movie-page-info-block/movie-page-info-block';
import NotFoundPage from '../not-found-page/not-found-page';
import Spinner from '../spinner/spinner';
import { useGetCommentsQuery, useGetOneFilmQuery } from '../../services/query-api';
import { adaptFilmToClient } from '../../services/adapters';
import { BtnLocation } from '../../const';


type MainPageProps = {authorizationStatus: boolean};

function MoviePage({authorizationStatus}: MainPageProps): JSX.Element {

  const {id}: {id: string} = useParams();

  const {data, isLoading, isError} = useGetOneFilmQuery(id);
  const {data: comments} = useGetCommentsQuery(id);


  if (isError) {
    return <NotFoundPage authorizationStatus={authorizationStatus}/>;
  }

  if (!data || isLoading) {
    return <Spinner/>;
  }

  const film = adaptFilmToClient(data);
  const {name, genre, released, posterImage, backgroundImage, isFavorite} = film;

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <MainHeader authorizationStatus={authorizationStatus}/>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">

                <BtnPlayer id={+id}/>

                <BtnMyList authorizationStatus={authorizationStatus} id={+id} isFavorite={isFavorite} location={BtnLocation.Movie}/>

                {authorizationStatus && <BtnAddReview id={id}/>}

              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

            <div className="film-card__desc">

              <MoviePageInfoBlock film={film} comments={comments}/>

            </div>
          </div>
        </div>
      </section>

      <div className="page-content">

        <MoviePageSimilar id={film.id}/>

        <Footer/>

      </div>
    </>
  );
}

export default MoviePage;

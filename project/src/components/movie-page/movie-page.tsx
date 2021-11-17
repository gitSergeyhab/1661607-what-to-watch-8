/* eslint-disable no-console */

import { useParams, useHistory} from 'react-router-dom';

import FilmList from '../film-list/film-list';
import Footer from '../footer/footer';
import NotFoundPage from '../not-found-page/not-found-page';

import { MouseEvent, useEffect } from 'react';
import { AppRoute } from '../../const';
import MoviePageInfoBlock from '../movie-page-info-block/movie-page-info-block';
import MainHeader from '../header/main-header/main-header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentAction, fetchMovieAction, fetchSimilarAction } from '../../store/api-action';
import { getComments, getMovie, getMovieLoadedStatus, getNeedSimilar } from '../../store/movie-data/movie-data-selectors';
import { getMovieErrorStatus } from '../../store/error-status/error-status-selectors';
import Spinner from '../spinner/spinner';


const Path = {AddReview: 'review', Films: '/films', Player: '/player'};


function AddReviewBtn({id}: {id: string}): JSX.Element {

  const history = useHistory();
  const addReviewPath = `${Path.Films}/${id}/${Path.AddReview}`;

  const handleAddReviewClick = (evt: MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    history.push(addReviewPath);
  };

  return <a href='/' onClick={handleAddReviewClick} className="btn film-card__button">Add review</a>;
}


type MainPageProps = {authorizationStatus: boolean};

function MoviePage({authorizationStatus}: MainPageProps): JSX.Element {

  const {id}: {id: string} = useParams();
  const history = useHistory();
  const playerPath = `${Path.Player}/${id}`;

  const dispatch = useDispatch();

  const film = useSelector(getMovie);
  const similar = useSelector(getNeedSimilar);
  const comments = useSelector(getComments);
  const error = useSelector(getMovieErrorStatus);
  const isFilmLoaded = useSelector(getMovieLoadedStatus);
  console.log(isFilmLoaded, 'isFilmLoaded');


  useEffect(() => {
    dispatch(fetchMovieAction(id));
    dispatch(fetchCommentAction(id));
    dispatch(fetchSimilarAction(id));
  }, [dispatch, id]);


  const handleBtnMyListClick = () => {
    if (authorizationStatus) {
      console.log('add');
    } else {
      history.push(AppRoute.SignIn);
    }
  };

  const handleBtnPlayClick = () => history.push(playerPath);


  if (error) {
    return <NotFoundPage authorizationStatus={authorizationStatus}/>;
  }

  if (!film) {
    return <Spinner/>;
  }


  const {name, genre, released, posterImage, backgroundImage} = film;


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
                <button className="btn btn--play film-card__button" type="button"
                  onClick={handleBtnPlayClick}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button"
                  onClick={handleBtnMyListClick}
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>

                {authorizationStatus && <AddReviewBtn id={id}/>}

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
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">

            <FilmList films={similar}/>

          </div>
        </section>

        <Footer/>

      </div>
    </>
  );
}

export default MoviePage;

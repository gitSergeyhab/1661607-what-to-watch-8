/* eslint-disable no-console */

import { useParams} from 'react-router-dom';

import FilmList from '../film-list/film-list';
import Footer from '../footer/footer';
import NotFoundPage from '../not-found-page/not-found-page';

import {  useEffect } from 'react';
import MoviePageInfoBlock from '../movie-page-info-block/movie-page-info-block';
import MainHeader from '../header/main-header/main-header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentAction, fetchMovieAction, fetchSimilarAction } from '../../store/api-action';
import { getComments, getMovie, getMovieLoadedStatus, getNeedSimilar } from '../../store/movie-data/movie-data-selectors';
import { getMovieErrorStatus } from '../../store/error-status/error-status-selectors';
import Spinner from '../spinner/spinner';
import BtnMyList from '../btns/btn-my-list/btn-my-list';
import BtnPlayer from '../btns/btn-player/btn-player';
import BtnAddReview from '../btns/btn-add-review/btn-add-review';
import { BtnLocation } from '../../const';


type MainPageProps = {authorizationStatus: boolean};

function MoviePage({authorizationStatus}: MainPageProps): JSX.Element {

  const {id}: {id: string} = useParams();

  const dispatch = useDispatch();

  const film = useSelector(getMovie);
  const similar = useSelector(getNeedSimilar);
  const comments = useSelector(getComments);
  const error = useSelector(getMovieErrorStatus);
  const isMovieLoaded = useSelector(getMovieLoadedStatus);


  useEffect(() => {
    dispatch(fetchMovieAction(id));
    dispatch(fetchCommentAction(id));
    dispatch(fetchSimilarAction(id));
  }, [dispatch, id]);


  if (error) {
    return <NotFoundPage authorizationStatus={authorizationStatus}/>;
  }

  if (!film || !isMovieLoaded) {
    return <Spinner/>;
  }

  const {name, genre, released, posterImage, backgroundImage, isFavorite} = film;

  const similarTitle = similar.length ? <h2 className="catalog__title">More like this</h2> : <span></span>;

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
        <section className="catalog catalog--like-this">

          {similarTitle}

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

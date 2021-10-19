/* eslint-disable no-console */

import {RouteProps, useParams, useHistory} from 'react-router-dom';

import FilmList from '../film-list/film-list';
import Footer from '../footer/footer';
import {MainHeader} from '../header/header';
import NotFoundPage from '../not-found-page/not-found-page';

import {Comment, Film} from '../../types/types';
import { MouseEvent } from 'react';
import { AuthorizationStatus } from '../../const';
import Tabs from '../tabs/tabs';


const ADD_REVIEW_END_PATH = 'review';

type MainPageProps = RouteProps & {films: Film[], comments: Comment[], authorizationStatus: AuthorizationStatus};

function MoviePage(props: MainPageProps): JSX.Element {
  const {films, comments, authorizationStatus} = props;

  const filmParam: {id: string, option: string} = useParams();
  const history = useHistory();

  const {id} = filmParam;
  const film = films.find((item) => item.id === +id);

  if (!film) {
    return <NotFoundPage authorizationStatus={authorizationStatus}/>;
  }

  const relatedFilms = films.filter((f) => film.genre === f.genre && film !== f).slice(0,4);

  const {name, genre, released, posterImage, backgroundImage} = film;
  const startPath = `/films/${id}`;

  const addReviewPath = `${startPath}/${ADD_REVIEW_END_PATH}`;

  const handlePushToAddReview = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    history.push(addReviewPath);
  };

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
                <button
                  onClick={() => history.push(`/player/${id}`)}
                  className="btn btn--play film-card__button" type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>

                <a href='/' onClick={handlePushToAddReview} className="btn film-card__button">Add review</a>

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

              <Tabs film={film} comments={comments}/>

            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">

            <FilmList films={relatedFilms}/>

          </div>
        </section>

        <Footer/>

      </div>
    </>
  );
}

export default MoviePage;

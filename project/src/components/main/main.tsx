import {MainHeader} from '../header/header';
import {Film} from '../../types/types';
import { useHistory } from 'react-router';
import MainBottom from '../main-bottom/main-bottom';
import { AuthorizationStatus } from '../../const';


type MainProps = {films: Film[], topFilm: Film, authorizationStatus: AuthorizationStatus}


function Main({films, topFilm, authorizationStatus}: MainProps): JSX.Element {

  const {name, posterImage, backgroundImage, genre, released, id} = topFilm;
  const history = useHistory();

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <MainHeader authorizationStatus={authorizationStatus}/>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

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
              </div>
            </div>
          </div>
        </div>
      </section>

      <MainBottom films={films}/>

    </>
  );
}

export default Main;


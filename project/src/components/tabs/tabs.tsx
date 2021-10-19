/* eslint-disable no-console */

import {useParams, Link} from 'react-router-dom';

import MoviePageInList from '../movie-page-in-list/movie-page-in-list';
import MoviePageDetails from '../movie-page-details/movie-page-details';
import MoviePageReviews from '../movie-page-reviews/movie-page-reviews';

import {Comment, Film} from '../../types/types';


const ACTIVE_OPTION_CLASS = 'film-nav__item--active';

const enum EndPathFilmPage {
  Overview = 'overview',
  Details = 'details',
  Reviews = 'reviews',
}

function Tabs({film, comments}: {film: Film, comments: Comment[]}): JSX.Element {

  const filmParam: {id: string, option: string} = useParams();
  const {id, option} = filmParam;

  const startPath = `/films/${id}`;
  const reviewsPath = `${startPath}/${EndPathFilmPage.Reviews}`;
  const detailsPath = `${startPath}/${EndPathFilmPage.Details}`;
  const overviewPath = `${startPath}/${EndPathFilmPage.Overview}`;

  let renderBlock: JSX.Element;
  switch(option) {
    case EndPathFilmPage.Overview:
      renderBlock = <MoviePageInList film={film}/>;
      break;
    case EndPathFilmPage.Details:
      renderBlock = <MoviePageDetails film={film}/>;
      break;
    case EndPathFilmPage.Reviews:
      renderBlock = <MoviePageReviews reviews={comments}/>;
      break;
    default:
      renderBlock = <MoviePageInList film={film}/>;
  }

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${option === EndPathFilmPage.Overview || !option ? ACTIVE_OPTION_CLASS : '' }`}>
            <Link to={overviewPath} className="film-nav__link">Overview</Link>
          </li>
          <li className={`film-nav__item ${option === EndPathFilmPage.Details ? ACTIVE_OPTION_CLASS : '' }`}>
            <Link to={detailsPath} className="film-nav__link">Details</Link>
          </li>
          <li className={`film-nav__item ${option === EndPathFilmPage.Reviews ? ACTIVE_OPTION_CLASS : '' }`}>
            <Link to={reviewsPath} className="film-nav__link">Reviews</Link>
          </li>
        </ul>
      </nav>

      {renderBlock}
    </>
  );
}

export default Tabs;

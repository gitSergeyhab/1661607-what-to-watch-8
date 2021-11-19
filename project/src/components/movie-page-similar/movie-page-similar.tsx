import { useSelector } from 'react-redux';
import { memo } from 'react';

import FilmList from '../film-list/film-list';
import { getNeedSimilar } from '../../store/movie-data/movie-data-selectors';


function MoviePageSimilar(): JSX.Element {

  const similar = useSelector(getNeedSimilar);

  const similarTitle = similar.length ? <h2 className="catalog__title">More like this</h2> : <span></span>;

  return (
    <section className="catalog catalog--like-this">

      {similarTitle}

      <div className="catalog__films-list">

        <FilmList films={similar}/>

      </div>
    </section>
  );
}

export default memo(MoviePageSimilar);

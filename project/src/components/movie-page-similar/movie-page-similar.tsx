import { memo } from 'react';

import FilmList from '../film-list/film-list';
import { useGetSimilarQuery } from '../../services/query-api';
import { adaptFilmToClient } from '../../services/adapters';


function MoviePageSimilar({id} : {id: number}): JSX.Element {

  const {data, isError, isFetching} = useGetSimilarQuery(id);

  if (isError) {
    return <span>Cannot find similar</span>;
  }

  if (isFetching) {
    return <span>Loading...</span>;
  }

  const similarTitle = data.length ? <h2 className="catalog__title">More like this</h2> : <span></span>;
  const similar = data.map(adaptFilmToClient).slice(0, 4);

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

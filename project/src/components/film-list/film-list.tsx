import FilmCard from '../film-card/film-card';
import {Film} from '../../types/types';
import { useState } from 'react';


function FilmList({films}: {films: Film[]}): JSX.Element {

  const [activeFilmId, setFilmId] = useState(-1);

  const onMouseEnter = (filmId: number): void => setFilmId(filmId);
  const onMouseLeave = (): void => setFilmId(-1);

  return (
    <>
      {films.map((film) => (
        <FilmCard
          onMouseLeave={onMouseLeave}
          onMouseEnter={() => onMouseEnter(film.id)}
          film={film}
          key={film.id}
        />))}

      {/* !!! DEL !!! */}
      <h2>{activeFilmId}</h2>

    </>
  );
}


export default FilmList;

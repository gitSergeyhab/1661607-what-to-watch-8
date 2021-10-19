// import FilmCard from '../film-card/film-card';
import {Film} from '../../types/types';
import { useEffect, useState } from 'react';
import MediaElement from '../media-element/media-element';
/* eslint-disable no-console */


function FilmList({films}: {films: Film[]}): JSX.Element {

  const [activefilmid, setFilmId] = useState(-1);
  const [format, setFormat] = useState('picture');

  let timeout: NodeJS.Timeout | null = null;

  const onMouseEnter = (film: Film): void => {
    setFilmId(film.id);
    timeout = setTimeout(() => setFormat('video'), 1000);
    // setFormat('video');
  };
  const onMouseLeave = (): void => {
    setFilmId(-1);
    setFormat('picture');
  };

  useEffect(() => function cleanup () {
    if (timeout) {
      clearTimeout(timeout);
    }
  }, [timeout]);

  return (
    <>
      {films.map((film) => (
        <MediaElement
          onMouseLeave={onMouseLeave}
          onMouseEnter={() => onMouseEnter(film)}
          film={film}
          key={film.id}
          format={format}
          activefilmid={activefilmid}
        />))}


      {/* !!! DEL !!! */}
      <h2>{ JSON.stringify(activefilmid)  }{format}</h2>

    </>
  );
}


export default FilmList;

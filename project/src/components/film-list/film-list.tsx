import {Film} from '../../types/types';
import MediaElement from '../media-element/media-element';


/* eslint-disable no-console */
function FilmList({films}: {films: Film[]}): JSX.Element {

  console.log('FilmList');

  return (
    <>
      {films.map((film) => (<MediaElement film={film} key={film.id}/>))}
    </>
  );
}

export default FilmList;

import MediaElement from '../media-element/media-element';
import { Film } from '../../types/types';


function FilmList({films}: {films: Film[]}): JSX.Element {

  return (
    <>
      {films.map((film) => (<MediaElement film={film} key={film.id}/>))}
    </>
  );
}

export default FilmList;

import { Link } from 'react-router-dom';
import {Film} from '../../types/types';


const FILM_PATH = '/films/';


export default function FilmCard({film}: {film: Film}): JSX.Element {

  const {name, previewImage, id} = film;
  const linkTo = `${FILM_PATH}${id}`;

  return (
    <>
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link to={linkTo} className="small-film-card__link">{name}</Link>
      </h3>
    </>
  );
}

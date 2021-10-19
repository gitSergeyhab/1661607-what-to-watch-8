// import { Link, useHistory } from 'react-router-dom';
// import {Film} from '../../types/types';


// const FILM_PATH = '/films/';


// type FilmCardProps = {
//   film: Film,
//   onMouseLeave: () => void,
//   onMouseEnter: () => void,
// }

// function FilmCard({film, onMouseLeave, onMouseEnter}: FilmCardProps): JSX.Element {

//   const history = useHistory();
//   const {name, previewImage, id} = film;
//   const linkTo = `${FILM_PATH}${id}`;

//   return (
//     <article
//       onMouseLeave={onMouseLeave}
//       onMouseEnter={onMouseEnter}
//       onClick={() => history.push(linkTo)}
//       className="small-film-card catalog__films-card"
//     >
//       <div className="small-film-card__image">
//         <img src={previewImage} alt={name} width="280" height="175" />
//       </div>
//       <h3 className="small-film-card__title">
//         <Link to={linkTo} className="small-film-card__link">{name}</Link>
//       </h3>
//     </article>
//   );
// }

// export default FilmCard;

import { Link } from 'react-router-dom';
import {Film} from '../../types/types';
import withArticle from '../../hocs/with-article/with-article';


const FILM_PATH = '/films/';


function FilmCard({film}: {film: Film}): JSX.Element {

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

export default withArticle(FilmCard) ;

// import { useHistory } from 'react-router';
import withArticle from '../../hocs/with-article/with-article';
import { Film } from '../../types/types';

// type FilmCardProps = {
//   film: Film,
//   onMouseLeave: () => void,
//   onMouseEnter: () => void,
// }

// const FILM_PATH = '/films/';


// function VideoPlayer({film, onMouseLeave, onMouseEnter}: FilmCardProps): JSX.Element {
//   const history = useHistory();
//   const linkTo = `${FILM_PATH}${film.id}`;

//   return (
//     <video
//       muted autoPlay width="280" height="175" poster={film.previewImage}
//       className="small-film-card catalog__films-card"
//       onMouseLeave={onMouseLeave}
//       onMouseEnter={onMouseEnter}
//       onClick={() => history.push(linkTo)}
//     >
//       <source
//         src={film.previewVideoLink}
//       />
//     </video>
//   );
// }

function VideoPlayer({film}: {film: Film}): JSX.Element {


  return (
    <video
      muted autoPlay width="280" height="175" poster={film.previewImage}
    >
      <source
        src={film.previewVideoLink}
      />
    </video>
  );
}
export default withArticle(VideoPlayer);

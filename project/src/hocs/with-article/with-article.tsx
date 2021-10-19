import {ComponentType} from 'react';
import { useHistory } from 'react-router';
import { Film } from '../../types/types';


type MouseEvtProps = {
  onMouseLeave: () => void,
  onMouseEnter: () => void,
};

type FilmCardProps = MouseEvtProps & {film: Film};

const FILM_PATH = '/films/';


function withArticle(Component: ComponentType<{film: Film}>)
  : ComponentType<FilmCardProps> {

  function WithArticle(props: FilmCardProps): JSX.Element {
    const {film, ...mouseEvtProps} = props;
    const history = useHistory();
    const {id} = film;
    const linkTo = `${FILM_PATH}${id}`;

    return (
      <article
        {...mouseEvtProps}
        onClick={() => history.push(linkTo)}
        className="small-film-card catalog__films-card"
      >
        <Component film={film}/>
      </article>
    );
  }

  return WithArticle;
}

export default withArticle;

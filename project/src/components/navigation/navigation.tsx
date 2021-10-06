import {GENRES} from '../../const';

function Genre(props: {genre: string, selectedGenre: string}): JSX.Element {
  return(
    <li className={`catalog__genres-item ${props.genre === props.selectedGenre ? 'catalog__genres-item--active' : ''}`}>
      <a href="/" className="catalog__genres-link">{props.genre}</a>
    </li>
  );
}

function Navigation({selectedGenre}: {selectedGenre: string}): JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {GENRES.map((genre) => <Genre genre={genre} selectedGenre={selectedGenre} key={genre}/>)}
    </ul>
  );
}

export default Navigation;

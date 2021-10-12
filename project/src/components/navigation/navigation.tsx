import { MouseEvent } from 'react';
import {GENRES} from '../../const';

type NavigationProps = {
  selectedGenre: string,
  onClick: (evt: MouseEvent<HTMLAnchorElement>) => void,
}

type GenreProps = NavigationProps & {genre: {title: string, data: string}}

function Genre({selectedGenre, onClick, genre}: GenreProps): JSX.Element {
  return(
    <li className={`catalog__genres-item ${genre.data === selectedGenre ? 'catalog__genres-item--active' : ''}`}>
      <a href="/" onClick={onClick} data-genre={genre.data} className="catalog__genres-link">{genre.title}</a>
    </li>
  );
}

function Navigation({selectedGenre, onClick}: NavigationProps): JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {GENRES.map((genre) => <Genre genre={genre} onClick={onClick} selectedGenre={selectedGenre} key={genre.data}/>)}
    </ul>
  );
}

export default Navigation;

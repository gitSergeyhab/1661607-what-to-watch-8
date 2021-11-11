import { MouseEvent } from 'react';
import { connect } from 'react-redux';

type MainGenresProps = {
  selectedGenre: string,
  onClick: (evt: MouseEvent<HTMLAnchorElement>) => void,
}

type GenreProps = MainGenresProps & {genre: string}

function Genre({selectedGenre, onClick, genre}: GenreProps): JSX.Element {
  return(
    <li className={`catalog__genres-item ${genre === selectedGenre ? 'catalog__genres-item--active' : ''}`}>
      <a href="/" onClick={onClick} data-genre={genre} className="catalog__genres-link">{genre}</a>
    </li>
  );
}

const mapStateToProps = ({genres}:{genres: string[]}) => ({genres});

function MainGenres({selectedGenre, genres, onClick}: MainGenresProps & {genres: string[]}): JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => <Genre genre={genre} onClick={onClick} selectedGenre={selectedGenre} key={genre}/>)}
    </ul>
  );
}

export default connect(mapStateToProps)(MainGenres);

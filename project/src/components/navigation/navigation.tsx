
function Genre(props: {genre: string}): JSX.Element {
  return(
    <li className="catalog__genres-item catalog__genres-item--active">
      <a href="/" className="catalog__genres-link">{props.genre}</a>
    </li>
  );
}


const GENRES = ['All genres', 'Comedies', 'Crime', 'Documentary', 'Dramas', 'Horror', 'Kids & Family', 'Romance', 'Sci-Fi', 'Thrillers'];

function Navigation(): JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {GENRES.map((genre) => <Genre genre={genre} key={genre}/>)}
    </ul>
  );
}

export default Navigation;

import { useState, MouseEvent } from 'react';
import { GENRES } from '../../const';
import { Film } from '../../types/types';
import { getFilmsByGenre } from '../../util';
import FilmList from '../film-list/film-list';
import Navigation from '../navigation/navigation';
/* eslint-disable no-console */

const SHOWN_FILMS = 4;//8


function MainBottom({films} : {films: Film[]}): JSX.Element {

  const [filmCount, setFilmsCount] = useState(SHOWN_FILMS);

  const [genre, setGenre] = useState(GENRES[0].data);

  const filmsByGenre = getFilmsByGenre(films, genre);

  const renderedFilms = filmsByGenre.slice(0, filmCount);

  const handleSelectGenre = (evt: MouseEvent): void => {
    evt.preventDefault();
    const target = evt.target as HTMLAnchorElement;
    const text = target.dataset.genre;
    setGenre(text || GENRES[0].data);
    setFilmsCount(SHOWN_FILMS);
  };

  return(
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <Navigation
          selectedGenre={genre}
          onClick={handleSelectGenre}
        />

        <div className="catalog__films-list">

          <FilmList films={renderedFilms}/>

        </div>
        <div className="catalog__more">

          {filmsByGenre.length > renderedFilms.length ?

            <button
              onClick={() => setFilmsCount((prevCount) => prevCount + SHOWN_FILMS)}
              className="catalog__button" type="button"
            >
              Show more
            </button>

            : ''}

        </div>

        {/* !!! DEL !!! */}
        {genre}

      </section>
    </div>
  );
}

export default MainBottom;

import { useState, MouseEvent } from 'react';
import { ALL_GENRES } from '../../const';
import { Film } from '../../types/types';
import { getFilmsByGenre } from '../../util/util';
import FilmList from '../film-list/film-list';
import MainGenres from '../main-genres/main-genres';
/* eslint-disable no-console */

const SHOWN_FILMS = 4;//8


function MainBottom({films} : {films: Film[]}): JSX.Element {

  const [filmCount, setFilmsCount] = useState(SHOWN_FILMS);

  const [genre, setGenre] = useState(ALL_GENRES);

  const filmsByGenre = getFilmsByGenre(films, genre);

  const renderedFilms = filmsByGenre.slice(0, filmCount);

  const handleSelectGenre = (evt: MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    const targetGenre = evt.currentTarget.dataset.genre;
    if (targetGenre) {
      setGenre(targetGenre);
    }

    setFilmsCount(SHOWN_FILMS);
  };

  return(
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MainGenres
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

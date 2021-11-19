import { useState, MouseEvent, memo } from 'react';
import { ALL_GENRES } from '../../const';
import { Film } from '../../types/types';
import { getFilmsByGenre } from '../../util/util';
import BtnShowMore from '../btns/btn-show-more/btn-show-more';
import FilmList from '../film-list/film-list';
import MainGenres from '../main-genres/main-genres';
/* eslint-disable no-console */

const SHOWN_FILMS = 8;


function MainBottom({films} : {films: Film[]}): JSX.Element {
  console.log('MainBottom');

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

  const handleShowMoreClick = () => setFilmsCount((prevCount) => prevCount + SHOWN_FILMS);

  const btnShoMore = filmsByGenre.length > renderedFilms.length ? <BtnShowMore onClick={handleShowMoreClick}/> : null;

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

          {btnShoMore}

        </div>

      </section>
    </div>
  );
}

export default memo(MainBottom) ;

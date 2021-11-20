import { useState, MouseEvent, memo } from 'react';

import BtnShowMore from '../btns/btn-show-more/btn-show-more';
import FilmList from '../film-list/film-list';
import Footer from '../footer/footer';
import MainGenres from '../main-genres/main-genres';
import { Film } from '../../types/types';
import { getFilmsByGenre } from '../../util/util';
import { ALL_GENRES } from '../../const';


const SHOWN_FILMS = 8;


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

      <Footer/>

    </div>
  );
}

export default memo(MainBottom) ;

import FilmCard from '../film-card/film-card';
import Footer from '../footer/footer';
import {MyListHeader} from '../header/header';

import { Film } from '../../types/types';


function MyList({films}: {films: Film[]}): JSX.Element {
  return (
    <div className="user-page">

      <MyListHeader/>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">

          {films.map((film) => <FilmCard film={film} key={film.id}/>)}

        </div>
      </section>

      <Footer/>

    </div>
  );
}


export default MyList;

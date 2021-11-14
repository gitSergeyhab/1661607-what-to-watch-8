import FilmList from '../film-list/film-list';
import Footer from '../footer/footer';

import { Film } from '../../types/types';
import MyListHeader from '../header/my-list-header/my-list-header';


function MyList({films}: {films: Film[]}): JSX.Element {
  return (
    <div className="user-page">

      <MyListHeader/>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">

          <FilmList films={films}/>

        </div>
      </section>

      <Footer/>

    </div>
  );
}


export default MyList;

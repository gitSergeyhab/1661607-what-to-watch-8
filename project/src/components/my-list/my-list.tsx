import FilmList from '../film-list/film-list';
import Footer from '../footer/footer';
import MyListHeader from '../header/my-list-header/my-list-header';
import NotFoundPage from '../not-found-page/not-found-page';
import Spinner from '../spinner/spinner';
import { useGetFavoritesQuery } from '../../services/query-api';
import { adaptFilmToClient } from '../../services/adapters';


function MyList(): JSX.Element {

  const {data, isError, isFetching} = useGetFavoritesQuery('');

  if (isError) {
    return <NotFoundPage authorizationStatus/>;
  }

  if (isFetching) {
    return <Spinner/>;
  }

  const favorites = data.map(adaptFilmToClient);

  const emptyList = <p style={{margin: 'auto'}}>Your List is Empty</p>;
  const myList = favorites && favorites.length ? <FilmList films={favorites}/> : emptyList;

  return (
    <div className="user-page">

      <MyListHeader/>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">

          {myList}

        </div>
      </section>

      <Footer/>

    </div>
  );
}


export default MyList;

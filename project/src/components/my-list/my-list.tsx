import FilmList from '../film-list/film-list';
import Footer from '../footer/footer';

import MyListHeader from '../header/my-list-header/my-list-header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchFavoritesAction } from '../../store/api-action';
import { getFavorites, getFavoritesLoadedStatus } from '../../store/favorite-data/favorite-data-selector';
import Spinner from '../spinner/spinner';
import { getFavoriteErrorStatus } from '../../store/error-status/error-status-selectors';
import NotFoundPage from '../not-found-page/not-found-page';


function MyList(): JSX.Element {

  const favorites = useSelector(getFavorites);
  const areFavoritesLoaded = useSelector(getFavoritesLoadedStatus);
  const error = useSelector(getFavoriteErrorStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (error) {
    return <NotFoundPage authorizationStatus/>;
  }

  if (!areFavoritesLoaded) {
    return <Spinner/>;
  }

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

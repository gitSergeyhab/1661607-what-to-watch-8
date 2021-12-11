import { useDispatch } from 'react-redux';

import MainBottom from '../main-bottom/main-bottom';
import MainPromo from '../main-promo/main-promo';
import NotFoundPage from '../not-found-page/not-found-page';
import Spinner from '../spinner/spinner';
import { useGetFilmsQuery } from '../../services/query-api';
import { adaptFilmToClient } from '../../services/adapters';
import { useEffect } from 'react';
import { setGenres } from '../../store/main-slice/main-slice';


type MainProps = {authorizationStatus: boolean}

function Main({authorizationStatus}: MainProps): JSX.Element {

  const {data, isError, isFetching, isLoading} = useGetFilmsQuery('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) { dispatch(setGenres(data)); }
  }, [data, dispatch]);


  if (isError) {
    return <NotFoundPage authorizationStatus={authorizationStatus}/>;
  }

  if (isLoading || isFetching) {
    return <Spinner/>;
  }

  const films = data.map(adaptFilmToClient);

  return (
    <>
      <MainPromo authorizationStatus={authorizationStatus} />
      <MainBottom films={films}/>
    </>
  );
}

export default Main ;


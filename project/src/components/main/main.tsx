import MainBottom from '../main-bottom/main-bottom';
import { useSelector } from 'react-redux';
import MainPromo from '../main-promo/main-promo';
import { getFilmsLoadedStatus, getFilms, getPromo } from '../../store/main-data/main-data-selectors';
import { getMainErrorStatus } from '../../store/error-status/error-status-selectors';
import NotFoundPage from '../not-found-page/not-found-page';
import Spinner from '../spinner/spinner';


type MainProps = {authorizationStatus: boolean}

function Main({authorizationStatus}: MainProps): JSX.Element {

  const promo = useSelector(getPromo);
  const films = useSelector(getFilms);
  const error = useSelector(getMainErrorStatus);
  const areFilmsLoaded = useSelector(getFilmsLoadedStatus);

  if (error) {
    return <NotFoundPage authorizationStatus={authorizationStatus}/>;
  }

  if (!areFilmsLoaded) {
    return <Spinner/>;
  }

  const promoBlock = promo ? <MainPromo authorizationStatus={authorizationStatus} promo={promo}/> : null;

  return (
    <>
      {promoBlock}
      <MainBottom films={films}/>
    </>
  );
}

export default Main ;


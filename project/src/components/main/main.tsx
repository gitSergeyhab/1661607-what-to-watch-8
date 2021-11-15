import MainBottom from '../main-bottom/main-bottom';
import { useSelector } from 'react-redux';
import MainPromo from '../main-promo/main-promo';
// import Spinner from '../spinner/spinner';
import { getFilms, getPromo } from '../../store/main-data/main-data-selectors';
// import { Film } from '../../types/types';


type MainProps = {authorizationStatus: boolean}

function Main({authorizationStatus}: MainProps): JSX.Element {

  const promo = useSelector(getPromo);
  const films = useSelector(getFilms);

  const promoBlock = promo ? <MainPromo authorizationStatus={authorizationStatus} promo={promo}/> : null;
  const filmListBlock = films && films.length ? <MainBottom films={films}/> : null;

  return (
    <>
      {promoBlock}
      {filmListBlock}
    </>
  );
}

export default Main ;


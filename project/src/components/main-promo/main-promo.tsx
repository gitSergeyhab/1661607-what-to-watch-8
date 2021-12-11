import BtnMyList from '../btns/btn-my-list/btn-my-list';
import BtnPlayer from '../btns/btn-player/btn-player';
import MainHeader from '../header/main-header/main-header';
import { useGetPromoQuery } from '../../services/query-api';
import { adaptFilmToClient } from '../../services/adapters';
import { BtnLocation } from '../../const';


type MAinPromoProps = {authorizationStatus: boolean}

function MainPromo({authorizationStatus}: MAinPromoProps): JSX.Element {

  const {data} = useGetPromoQuery('');
  if (!data) {
    return <span></span>;
  }

  const {name, posterImage, backgroundImage, genre, released, id, isFavorite} = adaptFilmToClient(data);

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={backgroundImage} alt={name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <MainHeader authorizationStatus={authorizationStatus}/>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={posterImage} alt={name} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{released}</span>
            </p>

            <div className="film-card__buttons">

              <BtnPlayer id={id}/>

              <BtnMyList authorizationStatus={authorizationStatus} id={id} isFavorite={isFavorite} location={BtnLocation.Promo}/>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainPromo;

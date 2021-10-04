import {GuestHeader} from '../header/header';

function HeadGuest(): JSX.Element {
  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src="img/bg-header.jpg" />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <GuestHeader/>

    </section>
  );
}

export default HeadGuest;

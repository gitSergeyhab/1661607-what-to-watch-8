import PropagateLoader from 'react-spinners/PropagateLoader';
import { css } from '@emotion/react';
import Footer from '../footer/footer';
import MainHeader from '../header/main-header/main-header';


const override = css`
  display: block;
  margin: 0 auto;
`;


export default function Spinner(): JSX.Element {
  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <h1 className="visually-hidden">WTW</h1>
          <MainHeader authorizationStatus={false}/>
        </div>

        <div style={{textAlign: 'center', fontSize: '27px', color: 'black'}}>
        ... Loading ...
          <PropagateLoader color='black' css={override} size={15} />
        </div>

      </section>
      <div className="page-content">
        <Footer/>
      </div>
    </>
  );
}

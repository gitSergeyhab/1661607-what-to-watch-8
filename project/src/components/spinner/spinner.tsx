import PropagateLoader from 'react-spinners/PropagateLoader';
import { css } from '@emotion/react';

import Footer from '../footer/footer';


const override = css`
  display: block;
  margin: 0 auto;
`;


export default function Spinner(): JSX.Element {
  return (
    <>
      <section className="film-card film-card--full" style={{backgroundColor: '#120301'}}>
        <div className="film-card__hero">
          <h1 className="visually-hidden">WTW</h1>
        </div>

        <div style={{textAlign: 'center', fontSize: '27px', color: 'white'}}>
          <p style={{paddingLeft: '15px'}}>... Loading ...</p>

          <PropagateLoader color='white' css={override} size={15}/>
        </div>

      </section>
      <div className="page-content">
        <Footer/>
      </div>
    </>
  );
}

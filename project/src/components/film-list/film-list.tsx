// // import FilmCard from '../film-card/film-card';
// import {Film} from '../../types/types';
// import { useEffect, useState } from 'react';
// import MediaElement from '../media-element/media-element';
// /* eslint-disable no-console */

// const CardFormat = {
//   Picture: 'picture',
//   Video: 'video',
// };


// function FilmList({films}: {films: Film[]}): JSX.Element {

//   const [activeFilmId, setFilmId] = useState(-1);
//   const [format, setFormat] = useState(CardFormat.Picture);

//   let timeout = setTimeout(() => setFormat(CardFormat.Picture), 0);


//   const onMouseEnter = (film: Film): void => {
//     setFilmId(film.id);
//     timeout = setTimeout(() => setFormat(CardFormat.Video), 1000);
//   };
//   const onMouseLeave = (): void => {
//     setFilmId(-1);
//     setFormat(CardFormat.Picture);
//   };

//   useEffect(() => function cleanup() {
//     clearTimeout(timeout);
//   }, [timeout]);

//   return (
//     <>
//       {films.map((film) => (
//         <MediaElement
//           onMouseLeave={onMouseLeave}
//           onMouseEnter={() => onMouseEnter(film)}
//           film={film}
//           key={film.id}
//           format={format}
//           id={activeFilmId}
//         />))}


//       {/* !!! DEL !!! */}
//       <h2>{ JSON.stringify(activeFilmId)  }{format}</h2>

//     </>
//   );
// }


// export default FilmList;

// import FilmCard from '../film-card/film-card';
import {Film} from '../../types/types';
// import { useEffect, useState } from 'react';
import MediaElement from '../media-element/media-element';
/* eslint-disable no-console */

// const CardFormat = {
//   Picture: 'picture',
//   Video: 'video',
// };


function FilmList({films}: {films: Film[]}): JSX.Element {


  return (
    <>
      {films.map((film) => (
        <MediaElement

          film={film}
          key={film.id}
        />))}


      {/* !!! DEL !!! */}

    </>
  );
}


export default FilmList;

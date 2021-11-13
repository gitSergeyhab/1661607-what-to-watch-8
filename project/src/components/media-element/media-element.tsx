// import {Film} from '../../types/types';
// import FilmCard from '../film-card/film-card';
// import VideoPlayer from '../video-player/video-player';

// type MediaElementProps = {
//   film: Film,
//   onMouseLeave: () => void,
//   onMouseEnter: () => void,
//   format: string,
//   id: number,
// }

// function MediaElement(props: MediaElementProps): JSX.Element {
//   const {format, ...componentProps} = props;
//   const {film, id} = componentProps;

//   if ('video' && film.id === id) {
//     return <VideoPlayer {...componentProps} />;
//   }

//   return  <FilmCard {...componentProps} />;
// }

// export default MediaElement;

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {Film} from '../../types/types';
import FilmCard from '../film-card/film-card';
import VideoPlayer from '../video-player/video-player';

const CardFormat = {
  Picture: 'picture',
  Video: 'video',
};

const FILM_PATH = '/films/';


function MediaElement({film} : {film: Film}): JSX.Element {

  const history = useHistory();
  const {id} = film;

  const [format, setFormat] = useState(CardFormat.Picture);

  let timeout: NodeJS.Timeout | null = null;
  const handleMouseEnter = () => {
    timeout = setTimeout(() => setFormat(CardFormat.Video), 1000);
  };

  const handleMouseLeave = () => {
    setFormat(CardFormat.Picture);
    if(timeout) {
      clearTimeout(timeout);
    }
  };

  const handleCardClick = () => history.push(`${FILM_PATH}${id}`);

  useEffect(() => function cleanup() {
    if(timeout) {
      clearTimeout(timeout);
    }
  });


  const Component = format === CardFormat.Video ? VideoPlayer : FilmCard;

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className="small-film-card catalog__films-card"
    >
      <Component film={film}/>
    </article>
  );

}

export default MediaElement;

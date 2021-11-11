import {Film} from '../../types/types';
import FilmCard from '../film-card/film-card';
import VideoPlayer from '../video-player/video-player';

type MediaElementProps = {
  film: Film,
  onMouseLeave: () => void,
  onMouseEnter: () => void,
  format: string,
  id: number,
}

function MediaElement(props: MediaElementProps): JSX.Element {
  const {format, ...componentProps} = props;
  const {film, id} = componentProps;

  if ('video' && film.id === id) {
    return <VideoPlayer {...componentProps} />;
  }

  return  <FilmCard {...componentProps} />;
}

export default MediaElement;

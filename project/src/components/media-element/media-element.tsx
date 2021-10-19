import {Film} from '../../types/types';
import FilmCard from '../film-card/film-card';
import VideoPlayer from '../video-player/video-player';

type MediaElementProps = {
  film: Film,
  onMouseLeave: () => void,
  onMouseEnter: () => void,
  format: string,
  activefilmid: number,
}

function MediaElement(props: MediaElementProps): JSX.Element {
  const {format, ...componentProps} = props;
  const {film, activefilmid} = componentProps;

  const ThisComponent = format === 'video' && film.id === activefilmid ? VideoPlayer : FilmCard ;
  return <ThisComponent {...componentProps} />;
}

export default MediaElement;

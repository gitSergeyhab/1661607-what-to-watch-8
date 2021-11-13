import { Film } from '../../types/types';

export default function VideoPlayer({film}: {film: Film}): JSX.Element {


  return (
    <video
      muted autoPlay width="280" height="175" poster={film.previewImage}
    >
      <source
        src={film.previewVideoLink}
      />
    </video>
  );
}

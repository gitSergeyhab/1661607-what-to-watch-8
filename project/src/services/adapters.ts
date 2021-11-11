import { Film, ServerFilm } from '../types/types';

export const adaptFilmToClient = (film: ServerFilm): Film => {
  const clientFilm = {
    ...film,
    posterImage: film['poster_image'],
    previewImage: film['preview_image'],
    backgroundImage: film['background_image'],
    backgroundColor: film['background_color'],
    videoLink: film['video_link'],
    previewVideoLink: film['preview_video_link'],
    scoresCount: film['scores_count'],
    runTime: film['run_time'],
    isFavorite: film['is_favorite'],
  };

  delete clientFilm['poster_image'];
  delete clientFilm['preview_image'];
  delete clientFilm['background_image'];
  delete clientFilm['background_color'];
  delete clientFilm['video_link'];
  delete clientFilm['preview_video_link'];
  delete clientFilm['scores_count'];
  delete clientFilm['run_time'];
  delete clientFilm['is_favorite'];

  return clientFilm as Film;
};

import { ALL_GENRES, MAX_GENRE_NUMBER } from './const';
import { Film } from './types/types';


const getScoreDescription = (score: number): string => {
  if (score === 10) {
    return 'Awesome';
  }
  if (score >= 8) {
    return 'Very good';
  }
  if (score >= 5) {
    return 'Good';
  }
  if (score >= 3) {
    return 'Normal';
  }
  return 'Bad';
};

const getTimeInHoursAndMinutes = (time: number): string => {
  const minutes = time % 60;
  const hours = Math.floor(time / 60);
  return `${hours}H ${minutes}M`;
};

const disableReviewBtn = (comment: string, stars: number): boolean => {
  if (comment.length > 49 && comment.length < 501 && stars > 0) {
    return false;
  }

  return true;
};

const getPlayerTiming = (runTime: number): string => {
  const hours = Math.floor(runTime / 60);
  const minutes = runTime % 60;
  return `${hours}:${minutes}:00`;
};

const getUniqueFilmGenres = (films: Film[]) => ([...new Set(films.map((film) => film.genre))].sort());

const getReviewDateFormat = (date: string): string =>  new Date(date).toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});

const getFilmsByGenre = (films: Film[], genre: string): Film[] => genre && genre !== ALL_GENRES ? films.filter((film) => film.genre === genre) : films;

const getGenreList = (films: Film[]): string[] => [ALL_GENRES, ...getUniqueFilmGenres(films).slice(0, MAX_GENRE_NUMBER)];

export {
  getScoreDescription,
  getTimeInHoursAndMinutes,
  getReviewDateFormat,
  disableReviewBtn,
  getPlayerTiming,
  getFilmsByGenre,
  getGenreList
};

import { Film } from '../types/types';
import { ALL_GENRES, MAX_GENRE_NUMBER, ReviewLength } from '../const';


const Re = {
  NUMBER: /\d/,
  LETTER: /[a-zа-я]/i,
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
};

const checkEmail = (email: string): boolean => Re.EMAIL.test(email);

const checkPassword = (password: string): boolean => Re.NUMBER.test(password) && Re.LETTER.test(password);


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

const addZero = (num: number) => {
  if (Math.floor(num / 10)) {
    return num.toString();
  }
  return `0${num}`;
};

const getPlayerTime = (time: number): string => {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);
  if (hours) {
    return `-${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
  }
  return `-${addZero(minutes)}:${addZero(seconds)}`;
};

const getProgressTime = (time: number, duration: number): string => `${time / duration * 100}`;

const disableReviewBtn = (comment: string, stars: number): boolean => {
  if (comment.length >= ReviewLength.Min && comment.length <= ReviewLength.Max && stars > 0) {
    return false;
  }

  return true;
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
  getFilmsByGenre,
  getGenreList,
  checkEmail,
  checkPassword,
  getPlayerTime,
  getProgressTime
};

import { name, internet, commerce, datatype, image, date } from 'faker';
import { adaptFilmToClient } from '../services/adapters';
import { Comment, Film, ServerFilm } from '../types/types';

const FAKE_FILM_NUM = 11;

export const makeFakeServerFilm = (favorite = false): ServerFilm => ({
  id: datatype.number(),
  name: commerce.productName(),
  'poster_image': image.image(),
  'preview_image': image.image(),
  'background_image': image.image(),
  'background_color': commerce.color(),
  'video_link': internet.url(),
  'preview_video_link': internet.url(),
  description: commerce.productDescription(),
  rating: datatype.number(10),
  'scores_count': datatype.number(10),
  director: name.lastName(),
  starring: new Array(1).fill(null).map(() => name.lastName()),
  'run_time':  datatype.number(200),
  genre: commerce.productName(),
  released: datatype.number(2021),
  'is_favorite': favorite ? true : datatype.boolean(),
});

export const makeFakeServerFilmList = (): ServerFilm[] => new Array(FAKE_FILM_NUM).fill(null).map(() => makeFakeServerFilm());
export const makeFakeServerFavoritesList = (): ServerFilm[] => new Array(FAKE_FILM_NUM).fill(null).map(() => makeFakeServerFilm(true));

export const makeFakeFilm = (favorite = false): Film => adaptFilmToClient(makeFakeServerFilm(favorite));
export const makeFakeFilmList = (): Film[] => new Array(FAKE_FILM_NUM).fill(null).map(() => makeFakeFilm());
export const makeFakeFavoritesList = (): Film[] => new Array(FAKE_FILM_NUM).fill(null).map(() => makeFakeFilm(true));


export const makeFakeComment = (): Comment => ({
  id: datatype.number(),
  user: {
    id: datatype.number(),
    name: internet.userName(),
  },
  rating: datatype.number(10),
  comment: commerce.productDescription(),
  date: date.past().toDateString(),
});

export const makeFakeCommentList = (): Comment[] => new Array(5).fill(null).map(() => makeFakeComment());

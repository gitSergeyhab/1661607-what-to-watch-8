const ALL_GENRES = 'All genres';

const MAX_GENRE_NUMBER = 10;

const STARS_COUNT = 10;

const enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

const enum BtnLocation {
  Promo = 'promo',
  Movie = 'movie',
}

const enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Similar = '/similar',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

const ReviewLength = {
  Min: 50,
  Max: 400,
};

const ErrorMessage = {
  Login: 'unable to log in',
  Logout: 'unable to log out',
  FetchFilms: 'unable to upload films',
  FetchPromo: 'unable to upload promo movie',
  FetchSimilar: 'unable to upload similar movies',
  FetchMovie: 'unable to upload this movie',
  FetchComments: 'unable to upload comments',
  FetchFavorite: 'unable to upload your movie list',
  PostComment: 'unable to send comment',
  PostFavorite: 'unable to change my list status',
  CheckAuthStatus: 'unable to check your status',
};

export {
  AppRoute,
  BtnLocation,
  APIRoute,
  ReviewLength,
  ALL_GENRES,
  MAX_GENRE_NUMBER,
  STARS_COUNT,
  ErrorMessage
};

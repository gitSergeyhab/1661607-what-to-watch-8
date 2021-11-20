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

export {
  AppRoute,
  BtnLocation,
  APIRoute,
  ReviewLength,
  ALL_GENRES,
  MAX_GENRE_NUMBER,
  STARS_COUNT
};

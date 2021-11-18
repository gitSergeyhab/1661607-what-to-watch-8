
const enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}


const ALL_GENRES = 'All genres';
const MAX_GENRE_NUMBER = 10;

const enum BtnLocation {
  Promo = 'promo',
  Movie = 'movie',
}

export {
  AppRoute,
  BtnLocation,
  ALL_GENRES,
  MAX_GENRE_NUMBER
};

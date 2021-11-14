
const enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

const enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth'
}

const ALL_GENRES = 'All genres';
const MAX_GENRE_NUMBER = 15;

export {
  AppRoute,
  AuthorizationStatus,
  ALL_GENRES,
  MAX_GENRE_NUMBER
};


const enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}


const ALL_GENRES = 'All genres';
const MAX_GENRE_NUMBER = 15;

export {
  AppRoute,
  ALL_GENRES,
  MAX_GENRE_NUMBER
};

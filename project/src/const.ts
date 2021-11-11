// const GENRES = ['All genres', 'Comedies', 'Crime', 'Documentary', 'Dramas', 'Horror', 'Kids & Family', 'Romance', 'Sci-Fi', 'Thrillers'];

const GENRES = [
  {title: 'All genres', data: ''},
  {title: 'Comedies', data: 'Comedy'},
  {title: 'Crime', data: 'Crime'},
  {title: 'Documentary', data: 'Documentary'},
  {title: 'Dramas', data: 'Drama'},
  {title: 'Horror', data: 'Horror'},
  {title: 'Kids & Family', data: 'Kids & Family'},
  {title: 'Romance',data: 'Romance'},
  {title: 'Sci-Fi', data: 'Sci-Fi'},
  {title: 'Thrillers', data: 'Thriller'},
];

const enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  // Film = '/films/:id/:option?',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

const enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth'
}

export {GENRES, AppRoute, AuthorizationStatus};

import { makeFakeCommentList, makeFakeFavoritesList, makeFakeFilm, makeFakeFilmList } from './test-mocks';


const fakeFilm = makeFakeFilm();
const fakeFilms = makeFakeFilmList();
const fakeFavorites = makeFakeFavoritesList();
const fakeComments = makeFakeCommentList();


export const TEST_ID = '11';

export const MockState = {
  FilledOk: {
    MainData: {
      areFilmsLoaded: true,
      isPromoLoaded: true,
      promo: fakeFilm,
      films: fakeFilms,
    },
    MovieData: {
      isMovieLoaded: true,
      areSimilarLoaded: true,
      movie: fakeFilm,
      similar: fakeFilms,
      comments: fakeComments,
    },
    FavoriteData: {
      areFavoritesLoaded: true,
      favorites: fakeFavorites,
    },
    UserData: {
      authorizationStatus: true,
      isAuthVerified: true,
    },
    ErrorStatus: {
      main: false,
      movie: false,
      favorite: false,
    },
  },
  EmptyNoAuth: {
    MainData: {
      areFilmsLoaded: true,
      isPromoLoaded: true,
      promo: null,
      films: [],
    },
    MovieData: {
      isMovieLoaded: true,
      areSimilarLoaded: true,
      movie: null,
      similar: [],
      comments: [],
    },
    FavoriteData: {
      areFavoritesLoaded: true,
      favorites: [],
    },
    UserData: {
      authorizationStatus: false,
      isAuthVerified: true,
    },
    ErrorStatus: {
      main: false,
      movie: false,
      favorite: false,
    },
  },
};


export const ScreenText = {
  Main: {
    MyList: /My list/i,
    Play: /Play/i,
    AllGenres: /All genres/i,
    ShowMore: /Show more/i,
  },
  MyList: {
    Filled: {
      Header: /My list/i,
    },
    Empty: {
      Status: /Your List is Empty/i,
    },
  },
  Login: {
    Email: /Email address/i,
    Password: /Password/i,
    SignIn: /Sign In/i,
  },
  Movie: {
    All: {
      MyList: /My list/i,
      Play: /Play/i,
      Overview: /Overview/i,
      Details: /Details/i,
      Reviews: /Reviews/i,
    },
    Auth: {
      AddReview: /Add review/i,
    },
  },
  Page404: {
    Message: /Page Not Found/i,
    Link: /Main Page/i,
  },
  AddReview: {
    Title: /Add review/i,
    Post: /Post/i,
    Placeholder: /Review text/i,
  },
  Similar: /More like this/i,
  Header: {
    SignIn: /Sign in/i,
    SignOut: /Sign Out/i,
    Alt: /User avatar/i,
  },
  Player: {
    Exit: /Exit/i,
    Dummy: /Player is Loading/i,
  },
  Spinner: /Loading/i,
  Footer: /2019 What to watch Ltd/i,
  Tab: {
    Overview: {
      Director: /Director/i,
      Starring: /Starring/i,
    },
    Details: {
      Genre: /Genre/i,
      RunTime: /Run Time/i,
    },
    Reviews: /No Reviews/i,
  },
};

import { render, screen } from '@testing-library/react';

import MoviePageInfoBlock from './movie-page-info-block';
import { makeFakeCommentList, makeFakeFilm } from '../../util/test-mocks';
import { ScreenText } from '../../util/test-const';


const film = makeFakeFilm();
const comments = makeFakeCommentList();
const activeClass = 'film-nav__item--active';
const director = new RegExp(film.director, 'i');


describe ('MoviePageInfoBlock Component', () => {
  it('should render correctly', () => {

    render(<MoviePageInfoBlock film={film} comments={comments}/>);

    expect(screen.queryByText(ScreenText.Tab.Overview.Director)).toBeInTheDocument();
    expect(screen.queryByText(director)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Movie.All.Overview)).toBeInTheDocument();
    expect(screen.getByText(ScreenText.Movie.All.Overview).parentElement).toHaveClass(activeClass);
  });
});

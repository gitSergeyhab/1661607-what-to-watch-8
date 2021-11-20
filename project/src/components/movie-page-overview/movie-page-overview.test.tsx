import { render, screen } from '@testing-library/react';
import MoviePageOverview from './movie-page-overview';
import { makeFakeFilm } from '../../util/test-mocks';
import { ScreenText } from '../../util/test-const';


const film = makeFakeFilm();
const director = new RegExp(film.director, 'i');

describe ('MoviePageOverview Component', () => {
  it('should render correctly', () => {

    render(<MoviePageOverview film={film}/>);

    expect(screen.queryByText(ScreenText.Tab.Overview.Director)).toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Tab.Overview.Starring)).toBeInTheDocument();
    expect(screen.queryByText(director)).toBeInTheDocument();
  });
});

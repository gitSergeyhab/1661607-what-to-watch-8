import { render, screen } from '@testing-library/react';

import MoviePageDetails from './movie-page-details';
import { makeFakeFilm } from '../../util/test-mocks';
import { ScreenText } from '../../util/test-const';


const film = makeFakeFilm();

describe ('MoviePageDetails Component', () => {
  it('should render correctly', () => {

    render(<MoviePageDetails film={film}/>);

    expect(screen.queryByText(ScreenText.Tab.Details.Genre)).toBeInTheDocument();
    expect(screen.queryByText(ScreenText.Tab.Details.RunTime)).toBeInTheDocument();
    expect(screen.queryByText(film.director)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import VideoPlayer from './video-player';
import { makeFakeFilm } from '../../util/test-mocks';

const TEST_VIDEO_ID = 'card-video';

const film = makeFakeFilm();
describe('VideoPlayer Component', () => {
  it ('should render correctly', () => {

    render(<VideoPlayer film={film}/>);

    expect(screen.getByTestId(TEST_VIDEO_ID)).toBeInTheDocument();
  });
});

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { PropagateLoader, GridLoader } from 'react-spinners';
import { css } from '@emotion/react';
import { toast } from 'react-toastify';

import NotFoundPage from '../not-found-page/not-found-page';
import { fetchMovieAction } from '../../store/api-actions';
import { getMovie, getMovieLoadedStatus } from '../../store/movie-data/movie-data-selectors';
import { getMovieErrorStatus } from '../../store/error-status/error-status-selectors';
import { getAuthVerifiedStatus } from '../../store/user-data/user-data-selectors';
import { getProgressTime, getPlayerTime } from '../../util/util';


const ERROR_MESSAGE = 'sorry... something is wrong...';

const override1= css`
  display: block;
  margin: 0 auto;
`;

const override = css`
  display: block;
  margin: 0 auto;
  padding-top: 50px;
  background-color: #000000;
`;

const PlayerBtn = {
  Play: '#play-s',
  Pause: '#pause',
};

const loadingMessage = (
  <>
    <p style={{fontSize: '27px'}}>Loading</p>
    <PropagateLoader color='black' css={override1} size={15} />
  </>);


function DummyPlayer(): JSX.Element {

  const history = useHistory();

  return (
    <div className="player">
      <div className="player__video" style={{backgroundColor: '#000000'}}>
        <div style={{textAlign: 'center', paddingTop: '50px', color: 'white', fontSize: '27px', fontWeight: 'bold'}}>
          Player is Loading
        </div>

        <GridLoader size={155} margin={5} color='white' css={override}/>
      </div>

      <button
        onClick={() => history.goBack()}
        type="button" className="player__exit"
      >Exit
      </button>
    </div>
  );
}


function Player(): JSX.Element {

  const history = useHistory();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const video = videoRef.current;

  const [isLoaded, setLoaded] = useState(false);
  const [statusPlay, setStatusPlay] = useState(false);
  const [timeToEnd, setTimeToEnd] = useState(0);
  const [progress, setProgress] = useState('0');
  const [uploadError, setError] = useState(false);


  const params: {id: string} = useParams();
  const {id} = params;

  const film = useSelector(getMovie);
  const error = useSelector(getMovieErrorStatus);
  const auth = useSelector(getAuthVerifiedStatus);
  const isMovieLoaded = useSelector(getMovieLoadedStatus);

  const controlStyle = isLoaded ? {} : {display: 'none'};


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieAction(id));
  }, [dispatch, id]);


  if (error) {
    return <NotFoundPage authorizationStatus={auth}/>;
  }

  if (!isMovieLoaded || !film) {
    return <DummyPlayer/>;
  }

  const handleExitClick = () => history.goBack();

  const handleFullScreenClick = () => {
    video?.requestFullscreen();
  };

  const handlePlayPauseClick = () => {
    if (video) {
      if (video.paused) {
        setStatusPlay(true);
        video.play();
      } else {
        setStatusPlay(false);
        video?.pause();
      }
    }
  };


  const handleTimeUpdate = () => {
    if (video) {
      const secondsFromBegin = Math.round(video.currentTime);
      const secondsToEnd = Math.round(video.duration - secondsFromBegin);
      setTimeToEnd(secondsToEnd);
      setProgress(getProgressTime(video.currentTime, video.duration));
    }
  };

  const handleUploadError = () => {
    toast.error(ERROR_MESSAGE);
    setError(true);
  };


  const handleMetaDataLoaded = () => {
    setLoaded(true);
    setError(false);
  };


  return (
    <div className="player" style={{backgroundColor: 'black', textAlign: 'center'}}>
      <div className="film-card__bg">
        <img src={film.backgroundImage} alt={film.name} />
      </div>
      {isLoaded || uploadError ? null : loadingMessage }

      <video
        height='50%'
        width='50%'
        style={{paddingTop: '10%'}}
        ref={videoRef}
        autoPlay={false}
        poster={film.posterImage}
        preload='auto'
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleMetaDataLoaded}
        onError={handleUploadError}
      >
        <source src={film.videoLink}/>
      </video>

      <button
        onClick={handleExitClick}
        type="button" className="player__exit"
      >Exit
      </button>

      <div className="player__controls" style={controlStyle}>
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">
            {getPlayerTime(timeToEnd)}
          </div>
        </div>

        <div className="player__controls-row">


          <button type="button" className="player__play"
            onClick={handlePlayPauseClick}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">

              <use xlinkHref={statusPlay ? PlayerBtn.Pause : PlayerBtn.Play}></use>

            </svg>
            <span>Play</span>
          </button>

          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen"
            onClick={handleFullScreenClick}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>

        </div>
      </div>
    </div>
  );
}

export default Player;

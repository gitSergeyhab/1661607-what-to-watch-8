import { MouseEvent, useState } from 'react';

import MoviePageOverview from '../movie-page-overview/movie-page-overview';
import MoviePageDetails from '../movie-page-details/movie-page-details';
import MoviePageReviews from '../movie-page-reviews/movie-page-reviews';
import { Comment, Film } from '../../types/types';

const TabClass = {
  tab: 'film-nav__item',
  activeTab: 'film-nav__item--active',
};

const TabName = {
  Overview: 'Overview',
  Details: 'Details',
  Reviews: 'Reviews',
};


type TabProps = {tab: string, activeTab: string, onClick: (evt: MouseEvent<HTMLLIElement>) => void}

function Tab({tab, activeTab, onClick} : TabProps): JSX.Element {

  const classes = tab === activeTab ? `${TabClass.activeTab} ${TabClass.tab}` : TabClass.tab;

  return (
    <li className={classes} data-tab={tab} onClick={onClick}>
      <a href="/" className="film-nav__link">{tab}</a>
    </li>
  );
}


function MoviePageInfoBlock({film, comments}: {film: Film, comments: Comment[]}): JSX.Element {

  const [activeTab, setActiveTab] = useState(TabName.Overview);

  const handleTabClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    const targetTab = evt.currentTarget.dataset.tab;
    if (targetTab) {
      setActiveTab(targetTab);
    }
  };


  let info = <MoviePageOverview film={film}/>;
  switch(activeTab) {
    case TabName.Details:
      info = <MoviePageDetails film={film}/>;
      break;
    case TabName.Reviews:
      info = <MoviePageReviews reviews={comments}/>;
  }

  const tabList = Object.keys(TabName)
    .map((tab) => <Tab tab={tab} activeTab={activeTab} key={tab} onClick={handleTabClick}/>);

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {tabList}
        </ul>
      </nav>

      {info}
    </>
  );
}

export default MoviePageInfoBlock;

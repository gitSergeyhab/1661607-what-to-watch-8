
const getScoreDescription = (score: number): string => {
  if (score === 10) {
    return 'Awesome';
  }
  if (score >= 8) {
    return 'Very good';
  }
  if (score >= 5) {
    return 'Good';
  }
  if (score >= 3) {
    return 'Normal';
  }
  return 'Bad';
};

const getTimeInHoursAndMinutes = (time: number): string => {
  const minutes = time % 60;
  const hours = Math.floor(time / 60);
  return `${hours}H ${minutes}M`;
};

const getReviewDateFormat = (date: string): string =>  new Date(date).toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});

export {getScoreDescription, getTimeInHoursAndMinutes, getReviewDateFormat};

export const getMoviePosterPath = (path: string): string => {
  return 'https://image.tmdb.org/t/p/w500' + path;
};

export const getStarRatings = () => {
  const ratings: string[] = [];

  for (let i = 0; i <= 10; i++) {
    ratings.push(i.toString());
  }

  return ratings;
};

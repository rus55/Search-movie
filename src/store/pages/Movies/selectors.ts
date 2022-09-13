import { IStore } from '../../i';

export const getMoviesData = (state: IStore) => {
  const { loading, moviesData } = state.movies;
  return { loading, moviesData };
};

export const getMovieData = (state: IStore) => {
  const { loading, movieData } = state.movies;
  return { loading, movieData };
}

import { IMovie } from '../../../interfaces/IMovies';
import { ISetMoviesDataAction } from './interfaces';

export const SET_MOVIES_DATA = 'SET_MOVIES_DATA';

export const setMoviesDataAction = (payload: IMovie[]): ISetMoviesDataAction => {
  return { type: SET_MOVIES_DATA, payload };
};

export const RESET_MOVIE_STORE = 'RESET_MOVIE_STORE';

export const resetMovieStoreAction = () => {
  return { type: RESET_MOVIE_STORE };
};

import { Dispatch } from 'redux';
import { MoviesService } from './movies-service';
import {
  IFetchMoviesActions,
  MoviesActionTypes,
  ICreateMovieActions,
  ISearchMoviesActions,
  IFetchMovieActions
} from './interfaces';
import { IMovie } from 'interfaces/IMovies';

export const fetchMoviesAsync = () => {
  return async (dispatch: Dispatch<IFetchMoviesActions>) => {
    try {
      dispatch({ type: MoviesActionTypes.FETCH_MOVIES });
      const response = await MoviesService.getMovies();
      dispatch({ type: MoviesActionTypes.FETCH_MOVIES_SUCCESS, payload: response.data });
    } catch {
      dispatch({ type: MoviesActionTypes.FETCH_MOVIES_FAILURE, payload: 'Ошибка!' });
    }
  };
};

export const fetchMovieAsync = (id: string) => {
  return async (dispatch: Dispatch<IFetchMovieActions>) => {
    try {
      dispatch({ type: MoviesActionTypes.FETCH_MOVIE });
      const response = await MoviesService.getMovie(id);
      dispatch({ type: MoviesActionTypes.FETCH_MOVIE_SUCCESS, payload: response.data });
    } catch {
      dispatch({ type: MoviesActionTypes.FETCH_MOVIE_FAILURE, payload: 'Ошибка!' });
    }
  };
};

export const createMovieAsync = ({ moviename, description, year, poster, type }: IMovie) => {
  return async (dispatch: Dispatch<ICreateMovieActions>) => {
    try {
      dispatch({ type: MoviesActionTypes.CREATE_MOVIE, payload: { moviename, description, year, poster, type } });
      const response = await MoviesService.addMovie({ moviename, description, year, poster, type });
      console.log('response', response);
      dispatch({ type: MoviesActionTypes.CREATE_MOVIE_SUCCESS });
    } catch {
      console.log('ошибка при отправке запроса');
      dispatch({ type: MoviesActionTypes.CREATE_MOVIE_FAILURE, payload: 'Ошибка!' });
    }
  };
};

export const searchMovieAsync = ({ searchString, yearFrom, yearTo, type }: any) => {
  return async (dispatch: Dispatch<ISearchMoviesActions>) => {
    try {
      dispatch({ type: MoviesActionTypes.SEARCH_MOVIES });
      const response = await MoviesService.searchMovie({ searchString, yearFrom, yearTo, type });
      dispatch({ type: MoviesActionTypes.SEARCH_MOVIES_SUCCESS, payload: response.data });
    } catch {
      dispatch({ type: MoviesActionTypes.SEARCH_MOVIES_FAILURE, payload: 'Ошибка!' });
    }
  };
};

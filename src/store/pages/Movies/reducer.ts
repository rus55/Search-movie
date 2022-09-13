import { RESET_MOVIE_STORE } from './actions';
import { IMoviesState, MoviesActionTypes } from './interfaces';
import { IMovie } from '../../../interfaces/IMovies';

const initialState: IMoviesState = {
  moviesData: [],
  movieData: undefined,
  loading: undefined,
  error: null,
};

export const MoviesReducer = (state: IMoviesState = initialState, action: any): IMoviesState => {
  switch (action.type) {
    case MoviesActionTypes.FETCH_MOVIES:
      return { ...state, loading: true };
    case MoviesActionTypes.FETCH_MOVIES_SUCCESS:
      return { ...state, loading: false, moviesData: [...action.payload] };
    case MoviesActionTypes.FETCH_MOVIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case MoviesActionTypes.FETCH_MOVIE:
      return { ...state, loading: true };
    case MoviesActionTypes.FETCH_MOVIE_SUCCESS:
      return { ...state, loading: false, movieData: action.payload };
    case MoviesActionTypes.FETCH_MOVIE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case MoviesActionTypes.SEARCH_MOVIES:
      return { ...state, loading: true };
    case MoviesActionTypes.SEARCH_MOVIES_SUCCESS:
      return { ...state, loading: false, moviesData: [...action.payload] };
    case MoviesActionTypes.SEARCH_MOVIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case RESET_MOVIE_STORE:
      return initialState;
    default:
      return state;
  }
};

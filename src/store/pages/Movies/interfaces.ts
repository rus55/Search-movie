import { IMovie } from '../../../interfaces/IMovies';

export interface IMoviesState {
  moviesData: IMovie[];
  movieData: IMovie | undefined;
  loading: boolean | undefined;
  error: string | null;
}

interface IBaseAction {
  type: string;
}

export interface ISetMoviesDataAction extends IBaseAction {
  payload: IMovie[];
}

export interface ICreateMoviesAction extends IBaseAction {
  payload: IMovie;
}

export enum MoviesActionTypes {
  FETCH_MOVIES = 'FETCH_MOVIES',
  FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS',
  FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE',
  FETCH_MOVIE = 'FETCH_MOVIE',
  FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS',
  FETCH_MOVIE_FAILURE = 'FETCH_MOVIE_FAILURE',
  CREATE_MOVIE = 'CREATE_MOVIE',
  CREATE_MOVIE_SUCCESS = 'CREATE_MOVIE_SUCCESS',
  CREATE_MOVIE_FAILURE = 'CREATE_MOVIE_FAILURE',
  SEARCH_MOVIES = 'SEARCH_MOVIES',
  SEARCH_MOVIES_SUCCESS = 'SEARCH_MOVIES_SUCCESS',
  SEARCH_MOVIES_FAILURE = 'SEARCH_MOVIES_FAILURE',
}

export interface IFetchMoviesAction {
  type: MoviesActionTypes.FETCH_MOVIES;
}

export interface IFetchMoviesSuccessAction {
  type: MoviesActionTypes.FETCH_MOVIES_SUCCESS;
  payload: IMovie[];
}

export interface IFetchMoviesFailureAction {
  type: MoviesActionTypes.FETCH_MOVIES_FAILURE;
  payload: string;
}


export type IFetchMoviesActions =
  | IFetchMoviesAction
  | IFetchMoviesSuccessAction
  | IFetchMoviesFailureAction;

  export interface IFetchMovieAction {
    type: MoviesActionTypes.FETCH_MOVIE;
  }
  
  export interface IFetchMovieSuccessAction {
    type: MoviesActionTypes.FETCH_MOVIE_SUCCESS;
    payload: IMovie[];
  }
  
  export interface IFetchMovieFailureAction {
    type: MoviesActionTypes.FETCH_MOVIE_FAILURE;
    payload: string;
  }
  
  
  export type IFetchMovieActions =
    | IFetchMovieAction
    | IFetchMovieSuccessAction
    | IFetchMovieFailureAction;


export interface ICreateMovieAction {
  type: MoviesActionTypes.CREATE_MOVIE;
  payload: IMovie
}

export interface ICreateMovieSuccessAction {
  type: MoviesActionTypes.CREATE_MOVIE_SUCCESS;
}

export interface ICreateMovieFailureAction {
  type: MoviesActionTypes.CREATE_MOVIE_FAILURE;
  payload: string;
}

export type ICreateMovieActions =
  | ICreateMovieAction
  | ICreateMovieSuccessAction
  | ICreateMovieFailureAction;

  export interface ISearchMoviesAction {
    type: MoviesActionTypes.SEARCH_MOVIES;
  }
  
  export interface ISearchMoviesSuccessAction {
    type: MoviesActionTypes.SEARCH_MOVIES_SUCCESS;
  }
  
  export interface ISearchMoviesFailureAction {
    type: MoviesActionTypes.SEARCH_MOVIES_FAILURE;
    payload: string;
  }
  
  export type ISearchMoviesActions =
    | ISearchMoviesAction
    | ISearchMoviesSuccessAction
    | ISearchMoviesFailureAction;


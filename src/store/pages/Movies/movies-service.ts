export const backHost = "http://localhost:3005/api";
import axios from 'axios';
import { IMovie } from 'interfaces/IMovies';

export const apiUrls = {
  "movies" : `${backHost}/movies`,
  "addMovie" : `${backHost}/addMovie`,
  "movie" : `${backHost}/movies/`,
  "search" : `${backHost}/search`,

  }

export const MoviesService = {
  getMovies: () => axios.get( 
    apiUrls.movies,
    {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    }),
  getMovie: (id: string) => axios.get( 
      apiUrls.movie + id,
      {
          method: 'GET',
          headers: {
              'content-type': 'application/json',
          }
      }),
  addMovie: ({ moviename, description, year, poster, type }: IMovie) => axios.post( 
    apiUrls.addMovie,
    {
        'moviename' : moviename,
        'description' : description,
        'year' : year,
        'poster': poster,
        'type': type
    }),
    searchMovie: ({ searchString, yearFrom, yearTo, type }: any) => axios.post( 
      apiUrls.search,
      {
          'searchString': searchString,
          'yearFrom' : yearFrom,
          'yearTo' : yearTo,
          'type': type
      }),
};

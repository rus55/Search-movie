import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { getMoviesData } from 'store/pages/Movies/selectors';
import { resetMovieStoreAction } from 'store/pages/Movies/actions';
import { fetchMoviesAsync } from 'store/pages/Movies/async-actions';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import style from './MovieList.module.scss';

const MoviesList= () => {
    const dispatch = useAppDispatch();

    const { loading, moviesData } = useAppSelector(getMoviesData);
  
    useEffect(() => {
      dispatch(fetchMoviesAsync());
      return () => {
        dispatch(resetMovieStoreAction());
      };
    }, []);
  
  
    return (
      <div>
        {loading && <span>Загрузка...</span>}
        {!loading && !moviesData.length && <span>Нет фильмов...</span>}
        {!loading && !!moviesData.length && <Row gutter={12}>
          {
                  moviesData.map(movie => {
                  return (
                    <Col span={6} key={movie.id}>
                        <div className={style.movie}>
                            <div className={style.movie__poster}>
                                <img src={movie.poster} />
                            </div>
                            
                            <h2>
                                <Link to={'/movies/' + movie.id}>
                                    {movie.moviename}
                                </Link>
                            </h2>
                            <p>
                                {movie.type}
                            </p>
                        </div>
                    </Col>
                  );
              })
          }
          </Row>}
          
      </div>
  
  );
  };
  export default MoviesList;
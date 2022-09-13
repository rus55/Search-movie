import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { getMoviesData } from 'store/pages/Movies/selectors';
import { resetMovieStoreAction } from 'store/pages/Movies/actions';
import { fetchMoviesAsync } from 'store/pages/Movies/async-actions';
import { Row, Col } from 'antd';
import { IMovie } from '../../interfaces/IMovies';
import style from './Movie.module.scss';


const Movie = () => {
    const params = useParams();
    const prodId = params.id;

    const dispatch = useAppDispatch();

    const { loading, moviesData } = useAppSelector(getMoviesData);
    const movie = moviesData.find((item) => item.id === prodId);

  
    useEffect(() => {
      dispatch(fetchMoviesAsync());
      return () => {
        dispatch(resetMovieStoreAction());
      };
    }, []);
  
    return (
      <>
      {loading && <p>Загрузка...</p>}
      {!loading && 
      <div >
            <h3>{(movie as IMovie).moviename}</h3>
            <Row>
            
            <Col span={8}>
                <img className={style.img} src={(movie as IMovie).poster}/>
            </Col>
            <Col span={12}>
                <div className={style.descr}>
                    <p>{(movie as IMovie).description}</p>
                    <p>Год выхода : {(movie as IMovie).year}</p>
                    <p>Жанр : {(movie as IMovie).type}</p>
                </div>
                
            </Col>
        </Row>
      </div>
      }
    
      </>
    );
  };
  export default Movie;
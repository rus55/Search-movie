import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { getMoviesData } from 'store/pages/Movies/selectors';
import { genres } from 'constats';
import { searchMovieAsync } from 'store/pages/Movies/async-actions';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import style from './Search.module.scss';

const SearchPage = () => {
  const dispatch = useAppDispatch();

  const { loading, moviesData } = useAppSelector(getMoviesData);

  const onFinish = (values: any) => {
    console.log('Success:', values);
    dispatch(searchMovieAsync({ 
        searchString: values.searchString,
        yearFrom: values.yearFrom,
        yearTo: values.yearTo,
        type: values.type
       }));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <>
      <h1>Поиск фильмов по параметрам</h1>
      <Form name="createMovie"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
            <Form.Item
              label="Искать"
              name="searchString"
              rules={[{ required: true, message: 'Пожалуйста, введите поисковый запрос!'}]}
            >
              <Input placeholder="Введите поисковый запрос"/>
             </Form.Item>

              <Form.Item
                label="Жанр"
                name="type"
                rules={[{ required: false, message: 'Please input type!' }]}
              >
                <Select>
                {
                  genres.map(genre => {
                    return (
                      <Select.Option value={genre}>{genre}</Select.Option>
                    )}
                  )
                }
                  
                </Select>
              </Form.Item>

              <Form.Item
                label="Год выхода от"
                name="yearFrom"
                rules={[{ required: false, message: 'Год выхода фильма должен быть от 1895 до 2022' }]}
              >
                <InputNumber min="1895" max="2022"/>
              </Form.Item>

              <Form.Item
                label="Год выхода до"
                name="yearTo"
                rules={[{ required: false, message: 'Год выхода фильма должен быть от 1895 до 2022' }]}
              >
                <InputNumber min="1895" max="2022"/>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Искать
                </Button>
              </Form.Item>
        </Form>
        {loading === false && !moviesData.length && <p>Ничего не найдено...</p>}
        {loading && <p>Поиск результатов...</p>}
        {loading === false && !!moviesData.length && <div>
          <h2>Результаты поиска</h2>
          <Row gutter={12}>
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
          </Row>
          </div>}
      
    </>
  );
};
export default SearchPage;

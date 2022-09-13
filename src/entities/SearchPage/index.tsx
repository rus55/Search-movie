import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { getMoviesData } from 'store/pages/Movies/selectors';
import { genres } from 'constats';
import { searchMovieAsync } from 'store/pages/Movies/async-actions';

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
                rules={[{ required: false, min: 1895, max: 2022, message: 'Год выхода фильма должен быть от 1895 до 2022' }]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="Год выхода до"
                name="yearTo"
                rules={[{ required: false, min: 1895, max: 2022, message: 'Год выхода фильма должен быть от 1895 до 2022' }]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Искать
                </Button>
              </Form.Item>
        </Form>
    </>
  );
};
export default SearchPage;

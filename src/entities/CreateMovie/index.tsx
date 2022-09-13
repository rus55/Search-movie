import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Input, InputNumber, Select, notification } from 'antd';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { createMovieAsync } from 'store/pages/Movies/async-actions';
import { genres } from 'constats';


const CreateMoviePage = () => {
    const {formState: { errors }} = useForm();
    const dispatch = useAppDispatch();
    const { TextArea } = Input;
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Success:', values);
        dispatch(createMovieAsync({ moviename: values.moviename,
           description: values.description,
            year: values.year,
            poster: values.poster,
            type: values.type
           }));
        notification.open({
            message: 'Фильм добавлен'
          });
          form.resetFields();
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

    return (
      <>
        <p className="title">Добавление фильма</p>

        <Form form={form} name="createMovie"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
            <Form.Item
              label="Название фильма"
              name="moviename"
              rules={[{ required: true, message: 'Please input movie name!' }]}
            >
              <Input />
             </Form.Item>

              <Form.Item
                label="Описание"
                name="description"
                rules={[{ required: true, message: 'Please input description!' }]}
              >
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item
                label="Ссылка на постер"
                name="poster"
                rules={[{ required: true, message: 'Please input poster!' }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Жанр"
                name="type"
                rules={[{ required: true, message: 'Please input type!' }]}
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
                label="Год выхода"
                name="year"
                rules={[{ required: true, message: 'Год выхода фильма должен быть от 1895 до 2022' }]}
              >
                <InputNumber min='1895' max='2022'/>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Добавить
                </Button>
              </Form.Item>
        </Form>
  
      </>
    );
  };
  export default CreateMoviePage;
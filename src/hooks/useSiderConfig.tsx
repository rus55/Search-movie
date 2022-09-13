import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useNavigate } from 'react-router-dom';

export const useSiderConfig = (): { siderConfig: ItemType[] } => {
  const navigate = useNavigate();

  const siderConfig = [
    {
      key: '/about',
      icon: <UploadOutlined />,
      label: 'О проекте',
      onClick: () => navigate('/about'),
    },
    {
      key: '/movies',
      icon: <UploadOutlined />,
      label: 'Каталог фильмов',
      onClick: () => navigate('/movies'),
    },
    {
      key: '/create_movie',
      icon: <UploadOutlined />,
      label: 'Добавить фильм',
      onClick: () => navigate('/create_movie'),
    },
    {
      key: '/search',
      icon: <UploadOutlined />,
      label: 'Поиск',
      onClick: () => navigate('/search'),
    },
  ];

  return { siderConfig };
};

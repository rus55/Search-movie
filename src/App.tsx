import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './assets/scss/normalize.scss';
import './assets/scss/global.scss';
import MoviesPage from 'entities/Catalog';
import CreateMoviePage from 'entities/CreateMovie';
import MainLayout from 'layouts/MainLayout';
import NotFound from 'entities/NotFoundPage';
import AboutPage from 'entities/AboutPage';
import SearchPage from 'entities/SearchPage';
import MoviesList from 'entities/MoviesList';
import Movie from 'entities/Movie';

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/movies" element={<MoviesPage />}>
          <Route index element={<MoviesList />} />
          <Route path=":id" element={<Movie />} />
        </Route>
        <Route path="/create_movie" element={<CreateMoviePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default App;

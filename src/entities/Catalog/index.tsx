import { Outlet } from 'react-router-dom';

const MoviesPage = () => {

  return (
    <>
    <h1>Каталог фильмов</h1>
    <Outlet />
    </>
  );
  
};
export default MoviesPage;

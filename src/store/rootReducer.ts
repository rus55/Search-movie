import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { MoviesReducer } from './pages/Movies/reducer';

const reducers = {
  movies: MoviesReducer
};

const rootReducer = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

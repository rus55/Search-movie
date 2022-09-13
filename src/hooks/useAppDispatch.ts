import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/rootReducer';

export const useAppDispatch: () => AppDispatch = useDispatch;

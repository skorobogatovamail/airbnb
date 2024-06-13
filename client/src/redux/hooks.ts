import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatchType, AppStateType } from './store';

export const useAppSelector = useSelector.withTypes<AppStateType>();
export const useAppDispatch = useDispatch.withTypes<AppDispatchType>();

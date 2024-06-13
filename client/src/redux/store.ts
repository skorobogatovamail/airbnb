import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type StoreType = typeof store;
export type AppDispatchType = typeof store.dispatch;
export type AppStateType = ReturnType<typeof store.getState>;

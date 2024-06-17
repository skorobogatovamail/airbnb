import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import authFirebaseReducer from './slices/authFirebase/authFirebaseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authFirebase: authFirebaseReducer,
  },
});

export type StoreType = typeof store;
export type AppDispatchType = typeof store.dispatch;
export type AppStateType = ReturnType<typeof store.getState>;

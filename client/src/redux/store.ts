import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import authFirebaseReducer from './slices/authFirebase/authFirebaseSlice';
import entriesReducer from './slices/entriesFirebase/entriesFirebaseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authFirebase: authFirebaseReducer,
    entriesFirebase: entriesReducer,
  },
});

export type StoreType = typeof store;
export type AppDispatchType = typeof store.dispatch;
export type AppStateType = ReturnType<typeof store.getState>;

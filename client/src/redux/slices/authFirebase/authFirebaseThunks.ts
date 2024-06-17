import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthState, UserLoginFormType, UserSignupFormType } from '../../../types/authTypesFirebase';
import authServiceFirebase from '../../../services/authServiceFirebase';

export const signupThunk = createAsyncThunk<AuthState, UserSignupFormType>(
  'authFirebase/signupThunk',
  (formdata) => authServiceFirebase.signup(formdata),
);

export const loginThunk = createAsyncThunk<AuthState, UserLoginFormType>(
  'authFirebase/loginThunk',
  (formdata) => authServiceFirebase.login(formdata),
);

export const refreshThunk = createAsyncThunk<AuthState>('authFirebase/refreshThunk', () =>
  authServiceFirebase.refreshToken(),
);

export const logoutThunk = createAsyncThunk('auth/logoutThunk', () => authServiceFirebase.logout());

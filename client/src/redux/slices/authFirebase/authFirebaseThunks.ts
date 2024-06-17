import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthState, UserLoginFormType, UserSignupFormType } from '../../../types/authTypes';
import authServiceFirebase from '../../../services/authServiceFirebase';

export const signupThunk = createAsyncThunk<AuthState, UserSignupFormType>(
  'auth/signupThunk',
  (formdata) => authServiceFirebase.signup(formdata),
);

export const loginThunk = createAsyncThunk<AuthState, UserLoginFormType>(
  'auth/loginThunk',
  (formdata) => authServiceFirebase.login(formdata),
);

export const refreshThunk = createAsyncThunk<AuthState>('auth/refreshThunk', () =>
  authServiceFirebase.refreshToken(),
);

export const logoutThunk = createAsyncThunk('auth/logoutThunk', () => authServiceFirebase.logout());

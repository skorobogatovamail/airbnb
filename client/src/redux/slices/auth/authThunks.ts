import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../../services/authService';
import type { AuthState, UserLoginFormType, UserSignupFormType } from '../../../types/authTypes';

export const signupThunk = createAsyncThunk<AuthState, UserSignupFormType>(
  'auth/signupThunk',
  (formdata) => authService.signup(formdata),
);

export const loginThunk = createAsyncThunk<AuthState, UserLoginFormType>(
  'auth/loginThunk',
  (formdata) => authService.login(formdata),
);

export const refreshThunk = createAsyncThunk<AuthState>('auth/refreshThunk', () =>
  authService.refreshToken(),
);

export const logoutThunk = createAsyncThunk('auth/logoutThunk', () => authService.logout());

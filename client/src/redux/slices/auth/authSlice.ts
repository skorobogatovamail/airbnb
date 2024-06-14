import { createSlice, isAction } from '@reduxjs/toolkit';
import type { AuthState } from '../../../types/authTypes';
import { loginThunk, logoutThunk, refreshThunk, signupThunk } from './authThunks';

const initialState: AuthState = {
  accessToken: '',
  user: {
    status: 'pending',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.accessToken = accessToken;
        state.user = user;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.accessToken = accessToken;
        state.user = user;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.accessToken = accessToken;
        state.user = user;
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.accessToken = '';
        state.user = { status: 'guest' };
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.accessToken = '';
        state.user = { status: 'guest' };
      });
  },
});

const authReducer = authSlice.reducer;

export default authReducer;

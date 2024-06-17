import { createSlice, isAction } from '@reduxjs/toolkit';
import type { AuthState } from '../../../types/authTypesFirebase';
import { loginThunk, logoutThunk, refreshThunk, signupThunk } from './authFirebaseThunks';

const initialState: AuthState = {
  accessToken: '',
  user: {
    status: 'pending',
  },
};

export const authFirebaseSlice = createSlice({
  name: 'authFirebase',
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

const authFirebaseReducer = authFirebaseSlice.reducer;

export default authFirebaseReducer;

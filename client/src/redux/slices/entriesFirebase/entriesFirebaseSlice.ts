import { createSlice } from '@reduxjs/toolkit';
import type { EntryStateType } from '../../../types/entriesTypes';
import {
  deleteEntryThunk,
  getAllEntriesThunk,
  getOneEntryThunk,
  postEntryThunk,
  updateEntryThunk,
  uploadPhotoByLinkThunk,
} from './entriesFirebaseThunks';

const initialState: EntryStateType = {
  entries: [],
  currentEntry: null,
  favorites: [],
};

export const entriesSlice = createSlice({
  name: 'entriesFirebase',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEntriesThunk.fulfilled, (state, action) => {
        state.entries = action.payload;
      })
      .addCase(getOneEntryThunk.fulfilled, (state, action) => {
        state.currentEntry = action.payload;
      })
      .addCase(postEntryThunk.fulfilled, (state, action) => {
        state.entries.push(action.payload);
      })
      .addCase(updateEntryThunk.fulfilled, (state, action) => {
        const idx = state.entries.findIndex((el) => el.key === action.payload.key);
        state.entries[idx] = action.payload;
      })
      .addCase(deleteEntryThunk.fulfilled, (state, action) => {
        state.entries = state.entries.filter((el) => el.key !== action.payload);
      });
  },
});

const entriesReducer = entriesSlice.reducer;

export default entriesReducer;

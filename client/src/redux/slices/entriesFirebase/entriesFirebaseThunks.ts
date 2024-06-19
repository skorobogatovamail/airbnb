import { createAsyncThunk } from '@reduxjs/toolkit';
import entryService from '../../../services/entryServiceFirebase';
import type { EntryFormType, EntryType, UploadPhotoLinkType, UploadPhotoType } from '../../../types/entriesTypes';

export const getAllEntriesThunk = createAsyncThunk('entriesFirebase/getAllEntriesThunk', () =>
  entryService.getAllEntries(),
);

export const getOneEntryThunk = createAsyncThunk(
  'entriesFirebase/getOneEntryThunk',
  (key: EntryType['key']) => entryService.getOneEntry(key),
);

export const postEntryThunk = createAsyncThunk(
  'entriesFirebase/postEntryThunk',
  (formdata: EntryFormType) => entryService.postEntry(formdata),
);

export const updateEntryThunk = createAsyncThunk(
  'entriesFirebase/updateEntryThunk',
  (formdata: EntryType) => entryService.updateEntry(formdata),
);

export const deleteEntryThunk = createAsyncThunk(
  'entriesFirebase/deleteEntryThunk',
  (key: EntryType['key']) => entryService.deleteEntry(key),
);

export const uploadPhotoByLinkThunk = createAsyncThunk(
  'entriesFirebase/uploadPhotoByLinkThunk',
  (formdata: UploadPhotoLinkType) => entryService.uploadPhotoByLink(formdata),
);

export const uploadPhotoThunk = createAsyncThunk(
  'entriesFirebase/uploadPhotoThunk',
  (formdata: UploadPhotoType) => entryService.uploadPhoto(formdata),
);

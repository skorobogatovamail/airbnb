import type { AxiosInstance } from 'axios';
import { entrySchema } from '../types/entriesTypes';
import type { EntryFormType, EntryType } from '../types/entriesTypes';
import httpClient from './httpClient';

class EntryService {
  constructor(private readonly client: AxiosInstance) {}

  async getAllEntries(): Promise<EntryType[]> {
    try {
      const res = await this.client('/entriesFirebase');
      if (res.status === 200) {
        const data = entrySchema.array().parse(res.data);
        return data;
      }
      return [];
    } catch (error) {
      console.log(error);
      return Promise.reject(new Error('unable to load entries'));
    }
  }

  async getOneEntry(key: EntryType['key']): Promise<EntryType> {
    const res = await this.client(`/entriesFirebase/${key}`);
    if (res.status === 200) {
      const data = entrySchema.parse(res.data);
      return data;
    }
    return Promise.reject(new Error('unable to load entries'));
  }

  async postEntry(formdata: EntryFormType): Promise<EntryType> {
    const res = await this.client.post('/entriesFirebase', formdata);
    if (res.status === 200) {
      const data = entrySchema.parse(res.data);
      return data;
    }
    return Promise.reject(new Error('unable to create entry'));
  }

  async updateEntry(formdata: EntryType): Promise<EntryType> {
    const res = await this.client.put(`/entriesFirebase/${formdata.key}`, formdata);
    if (res.status === 200) {
      const data = entrySchema.parse(res.data);
      return data;
    }
    return Promise.reject(new Error('unable to create entry'));
  }

  async deleteEntry(key: EntryType['key']): Promise<EntryType['key']> {
    const res = await this.client.delete(`/entriesFirebase/${key}`);
    if (res.status === 200) {
      return key;
    }
    return Promise.reject(new Error('unable to create entry'));
  }
}

const entryService = new EntryService(httpClient);

export default entryService;

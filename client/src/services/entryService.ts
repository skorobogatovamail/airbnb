import type { AxiosInstance, AxiosResponse } from 'axios';
import { entrySchema } from '../types/entriesTypes';
import type { EntryType } from '../types/entriesTypes';

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

  async postNewEntry(formdata: EntryType): Promise<EntryType> {
    const res = await this.client.post('/entriesFirebase', formdata);
    if (res.status === 200) {
      const data = entrySchema.parse(res.data);
      return data;
    }
    return Promise.reject(new Error('unable to create entry'));
  }
}

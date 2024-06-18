import React from 'react';
import UniversalForm from './UniversalForm';
import { useAppDispatch } from '../../redux/hooks';
import { postEntryThunk } from '../../redux/slices/entriesFirebase/entriesFirebaseThunks';
import { entryFormSchema } from '../../types/entriesTypes';

export default function CardForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const inputs = [
    {
      name: 'name',
      type: 'text',
      label: 'name',
      placeholder: 'Name of the hotel',
    },
    {
      name: 'address',
      type: 'text',
      label: 'address',
      placeholder: 'Address of the hotel',
    },
    {
      name: 'image',
      type: 'text',
      label: 'image',
      placeholder: 'Image of the hotel',
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formdata = Object.fromEntries(new FormData(e.currentTarget));
    const data = entryFormSchema.parse(formdata);
    void dispatch(postEntryThunk(data));
  };
  return <UniversalForm inputs={inputs} onSubmit={handleSubmit} buttonText="Save" withDownloads />;
}

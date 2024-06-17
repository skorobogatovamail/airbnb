import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import EntryCard from '../ui/EntryCard';

export default function MainPage(): JSX.Element {
  const entries = useAppSelector((store) => store.entriesFirebase.entries);
  return (
    <div className="mt-4">
      {' '}
      <h1 className="mt-10 text-center text-5xl">Main page</h1>
      <div className="mt-10 flex flex-wrap items-center justify-around">
        {entries.map((entry) => (
          <EntryCard entry={entry} />
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import EntryCard from '../ui/EntryCard';

export default function MainPage(): JSX.Element {
  const entries = useAppSelector((store) => store.entriesFirebase.entries);
  return (
    <>
      <h1>Main page</h1>
      <div className="flex">
        {entries.map((entry) => (
          <EntryCard entry={entry} />
        ))}
      </div>
    </>
  );
}

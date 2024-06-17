import React from 'react';
import type { EntryType } from '../../types/entriesTypes';

type EntryCardProps = {
  entry: EntryType;
};
export default function EntryCard({ entry }: EntryCardProps): JSX.Element {
  return (
    <div>
      <div>{entry.name}</div>
      <div>{entry.address}</div>
      <div>{entry.description}</div>
      <div>{entry.hostId}</div>
    </div>
  );
}

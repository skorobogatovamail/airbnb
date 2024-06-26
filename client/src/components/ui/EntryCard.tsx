import React from 'react';
import { Link } from 'react-router-dom';
import type { EntryType } from '../../types/entriesTypes';

type EntryCardProps = {
  entry: EntryType;
};
export default function EntryCard({ entry }: EntryCardProps): JSX.Element {
  const defaultImage =
    'https://images.bubbleup.com/width1920/quality35/mville2017/1-brand/1-margaritaville.com/gallery-media/220803-compasshotel-medford-pool-73868-1677873697-78625-1694019828.jpg';

  return (
    <div className="w-64">
      <Link to={`/hotels/${entry.key}`}>
        <div>
          <img
            className="object-cover rounded-xl h-64"
            src={entry.image || defaultImage}
            alt="hotel"
          />
        </div>
      </Link>

      <div className="flex flex-col px-2 py-4">
        <div className="text-xl font-bold">{entry.name}</div>
        <div className="text-gray-500 mt-2">{entry.address}</div>
        <div className="text-sm mt-2">{entry.description}</div>
        {/* <div>{entry.hostId}</div> */}
      </div>
    </div>
  );
}

import { Typography } from '@material-tailwind/react';

import { EarthquakeData } from '../../interface';
import EarthquakeListSkeleton from '../skeleton/EarthquakeListSkeleton';
import EarthquakeItem from './EarthquakeItem';

interface EarthquakeListProps {
  title: string;
  earthquakes: EarthquakeData[] | null;
  onSelectEarthquake?: (coordinates: [number, number]) => void;
}

export default function EarthquakeList({
  title,
  earthquakes,
  onSelectEarthquake,
}: EarthquakeListProps) {
  if (!earthquakes) {
    return <EarthquakeListSkeleton title={title} />;
  }

  return (
    <section className='my-4 w-full'>
      <div className='mb-3 flex items-center justify-between border-b pb-2'>
        <Typography variant='h2' className='text-lg font-bold text-blue-gray-900'>
          {title}
        </Typography>
        <span className='rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700'>
          {earthquakes.length} Gempa
        </span>
      </div>

      <section className='flex w-full flex-col gap-3'>
        {earthquakes.map((earthquake, index) => (
          <EarthquakeItem
            key={`${earthquake.tanggal}-${earthquake.jam}-${index}`}
            earthquake={earthquake}
            onSelect={onSelectEarthquake}
          />
        ))}
      </section>
    </section>
  );
}

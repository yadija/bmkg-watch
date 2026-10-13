import { Typography } from '@material-tailwind/react';

import { EarthquakeData } from '@/types';

import EarthquakeItem from './earthquake-item';
import EarthquakeListSkeleton from './earthquake-list-skeleton';

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
      <section className='mb-3 flex items-center justify-between border-b border-gray-200 pb-2'>
        <Typography variant='h2' className='text-base font-bold text-gray-900'>
          {title}
        </Typography>
        <span className='rounded-none border border-gray-300 bg-white px-2.5 py-0.5 text-xs font-bold text-gray-800'>
          {earthquakes.length} Gempa
        </span>
      </section>

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

import { LuMapPin } from 'react-icons/lu';

import { EarthquakeData } from '@/types';
import { parseEarthquakeCoordinates } from '@/utils';

interface EarthquakeItemProps {
  earthquake: EarthquakeData;
  onSelect?: (coordinates: [number, number]) => void;
}

export default function EarthquakeItem({ earthquake, onSelect }: EarthquakeItemProps) {
  const mag = parseFloat(earthquake.magnitude);
  const isHighMagnitude = !isNaN(mag) && mag >= 5.0;

  const coord = parseEarthquakeCoordinates(
    earthquake.coordinates,
    earthquake.lintang,
    earthquake.bujur,
  );

  const handleFocus = () => {
    if (onSelect && coord) {
      onSelect(coord);
    }
  };

  return (
    <section className='w-full rounded-none border border-gray-300 bg-white p-4 shadow-none transition-colors hover:border-gray-900 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-500'>
      <section className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
        <section className='flex-1'>
          <section className='mb-2 flex items-center gap-2.5'>
            <span
              className={`inline-flex shrink-0 items-center justify-center border px-2.5 py-1 text-xs font-bold leading-none text-white ${
                isHighMagnitude
                  ? 'border-red-600 bg-red-600'
                  : 'border-amber-600 bg-amber-600'
              }`}
            >
              M {earthquake.magnitude}
            </span>
            <h3 className='text-sm font-bold text-gray-900 dark:text-zinc-100'>
              {earthquake.wilayah}
            </h3>
          </section>

          <section className='grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-gray-700 dark:text-zinc-300 sm:grid-cols-4'>
            <p>
              <span className='font-bold text-gray-900 dark:text-zinc-100'>Waktu:</span>{' '}
              {earthquake.tanggal} &bull; {earthquake.jam}
            </p>
            <p>
              <span className='font-bold text-gray-900 dark:text-zinc-100'>
                Kedalaman:
              </span>{' '}
              {earthquake.kedalaman}
            </p>
            <p>
              <span className='font-bold text-gray-900 dark:text-zinc-100'>
                Koordinat:
              </span>{' '}
              {earthquake.lintang}, {earthquake.bujur}
            </p>
            {earthquake.potensi && (
              <p className='col-span-2 sm:col-span-1'>
                <span className='font-bold text-gray-900 dark:text-zinc-100'>
                  Potensi:
                </span>{' '}
                <span className='font-semibold text-amber-800 dark:text-amber-400'>
                  {earthquake.potensi}
                </span>
              </p>
            )}
            {earthquake.dirasakan && (
              <p className='col-span-2 sm:col-span-1'>
                <span className='font-bold text-gray-900 dark:text-zinc-100'>
                  Dirasakan:
                </span>{' '}
                <span className='font-semibold text-blue-800 dark:text-blue-400'>
                  {earthquake.dirasakan}
                </span>
              </p>
            )}
          </section>
        </section>

        {coord && onSelect && (
          <button
            onClick={handleFocus}
            className='inline-flex shrink-0 items-center justify-center gap-1.5 self-start border border-gray-400 bg-gray-50 px-3 py-2 text-xs font-bold leading-none text-gray-900 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 sm:self-center'
            title='Tampilkan episentrum ini di peta terpadu'
          >
            <LuMapPin size={13} className='shrink-0 text-red-600 dark:text-red-400' />
            <span>Pusatkan di Peta</span>
          </button>
        )}
      </section>
    </section>
  );
}

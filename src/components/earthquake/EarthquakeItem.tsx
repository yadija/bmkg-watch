import { Card, CardBody, Typography } from '@material-tailwind/react';

import { EarthquakeData } from '@/types';

interface EarthquakeItemProps {
  earthquake: EarthquakeData;
  onSelect?: (coordinates: [number, number]) => void;
}

export default function EarthquakeItem({ earthquake, onSelect }: EarthquakeItemProps) {
  const mag = parseFloat(earthquake.magnitude);
  const isHighMagnitude = !isNaN(mag) && mag >= 5.0;

  const lat = Number(earthquake.coordinates[0]);
  const lon = Number(earthquake.coordinates[1]);
  const hasValidCoord = !isNaN(lat) && !isNaN(lon);

  const handleFocus = () => {
    if (onSelect && hasValidCoord) {
      onSelect([lat, lon]);
    }
  };

  return (
    <Card className='w-full border border-gray-100 shadow-sm transition-all hover:border-blue-200 hover:shadow-md'>
      <CardBody className='flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center'>
        <section className='flex-1'>
          <section className='mb-2 flex items-center gap-3'>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-sm ${
                isHighMagnitude ? 'bg-red-600' : 'bg-amber-600'
              }`}
            >
              M {earthquake.magnitude}
            </span>
            <Typography variant='h3' className='text-base font-bold text-blue-gray-900'>
              {earthquake.wilayah}
            </Typography>
          </section>

          <section className='grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 sm:grid-cols-4'>
            <p>
              <span className='font-semibold text-gray-800'>Waktu:</span>{' '}
              {earthquake.tanggal} {earthquake.jam}
            </p>
            <p>
              <span className='font-semibold text-gray-800'>Kedalaman:</span>{' '}
              {earthquake.kedalaman}
            </p>
            <p>
              <span className='font-semibold text-gray-800'>Koordinat:</span>{' '}
              {earthquake.lintang}, {earthquake.bujur}
            </p>
            {earthquake.potensi && (
              <p className='col-span-2 sm:col-span-1'>
                <span className='font-semibold text-gray-800'>Potensi:</span>{' '}
                <span className='text-red-700'>{earthquake.potensi}</span>
              </p>
            )}
            {earthquake.dirasakan && (
              <p className='col-span-2 sm:col-span-1'>
                <span className='font-semibold text-gray-800'>Dirasakan:</span>{' '}
                <span className='text-amber-800'>{earthquake.dirasakan}</span>
              </p>
            )}
          </section>
        </section>

        {hasValidCoord && onSelect && (
          <button
            onClick={handleFocus}
            className='flex items-center justify-center gap-1.5 self-start whitespace-nowrap rounded-lg border border-blue-500/30 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-600 hover:text-white sm:self-center'
            title='Tampilkan episentrum ini di peta terpadu'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='size-4'
            >
              <path
                fillRule='evenodd'
                d='m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z'
                clipRule='evenodd'
              />
            </svg>
            Pusatkan di Peta
          </button>
        )}
      </CardBody>
    </Card>
  );
}

import { Typography } from '@material-tailwind/react';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

import { EarthquakeData, NewestEarthquake } from '@/types';
import { parseEarthquakeCoordinates } from '@/utils';

interface EarthquakeMapProps {
  newestEarthquake: NewestEarthquake | null;
  earthquakes5Min: EarthquakeData[] | null;
  earthquakesFelt: EarthquakeData[] | null;
  selectedCoord: [number, number] | null;
}

type FilterMode = 'all' | 'm5' | 'felt';

// controller to smoothly fly to coordinates when an earthquake is selected
function MapController({ targetCoord }: { targetCoord: [number, number] | null }) {
  const map = useMap();

  useEffect(() => {
    if (targetCoord) {
      map.flyTo(targetCoord, 8, { duration: 1.2 });
    }
  }, [targetCoord, map]);

  return null;
}

// reset view button control inside map
function ResetViewButton() {
  const map = useMap();

  return (
    <button
      onClick={() => map.setView([-2.5, 118], 5)}
      className='absolute bottom-4 left-4 z-[1000] rounded-none border border-gray-400 bg-white px-3 py-1.5 text-xs font-bold text-gray-900 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900'
      title='Pusatkan ke seluruh Indonesia'
    >
      Reset Tampilan
    </button>
  );
}

// custom flat square marker with magnitude label
const createMarkerIcon = (
  magnitude: string | number,
  isLatest: boolean,
  isFelt: boolean,
) => {
  const magNum = Number(magnitude);
  const bgColor = isLatest ? '#dc2626' : isFelt ? '#d97706' : '#ef4444';
  const border = isLatest ? '2px solid #ffffff' : '1px solid #ffffff';

  return L.divIcon({
    className: 'custom-earthquake-pin',
    html: `
      <div style="
        background-color: ${bgColor};
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 11px;
        border: ${border};
        cursor: pointer;
      ">
        ${!isNaN(magNum) && magNum > 0 ? magNum.toFixed(1) : 'M'}
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -16],
  });
};

export default function EarthquakeMap({
  newestEarthquake,
  earthquakes5Min,
  earthquakesFelt,
  selectedCoord,
}: EarthquakeMapProps) {
  const [filter, setFilter] = useState<FilterMode>('all');

  // parse latest earthquake coordinates
  const latestCoord = newestEarthquake
    ? parseEarthquakeCoordinates(
        newestEarthquake.coordinates,
        newestEarthquake.lintang,
        newestEarthquake.bujur,
      )
    : null;

  const show5Min = filter === 'all' || filter === 'm5';
  const showFelt = filter === 'all' || filter === 'felt';

  return (
    <section className='my-6 rounded-none border border-gray-300 bg-white shadow-none dark:border-zinc-800 dark:bg-zinc-900'>
      <section className='flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/80'>
        <section>
          <Typography
            variant='h2'
            className='text-base font-bold text-gray-900 dark:text-zinc-100'
          >
            Peta Sebaran Gempa Bumi Indonesia
          </Typography>
          <p className='mt-0.5 text-xs text-gray-700 dark:text-zinc-400'>
            Satu peta terpadu untuk memantau semua titik episentrum gempa BMKG
          </p>
        </section>

        {/* filter buttons */}
        <section className='flex flex-wrap gap-1.5'>
          <button
            onClick={() => setFilter('all')}
            className={`h-8 rounded-none border px-3 text-xs font-bold transition-colors ${
              filter === 'all'
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-gray-300 bg-white text-gray-800 hover:border-gray-900 hover:text-gray-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100'
            }`}
          >
            Semua Gempa
          </button>
          <button
            onClick={() => setFilter('m5')}
            className={`h-8 rounded-none border px-3 text-xs font-bold transition-colors ${
              filter === 'm5'
                ? 'border-red-600 bg-red-600 text-white'
                : 'border-gray-300 bg-white text-gray-800 hover:border-gray-900 hover:text-gray-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100'
            }`}
          >
            M 5.0+ ({earthquakes5Min?.length || 0})
          </button>
          <button
            onClick={() => setFilter('felt')}
            className={`h-8 rounded-none border px-3 text-xs font-bold transition-colors ${
              filter === 'felt'
                ? 'border-amber-600 bg-amber-600 text-white'
                : 'border-gray-300 bg-white text-gray-800 hover:border-gray-900 hover:text-gray-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100'
            }`}
          >
            Dirasakan ({earthquakesFelt?.length || 0})
          </button>
        </section>
      </section>

      <section className='relative p-0'>
        <MapContainer
          center={[-2.5, 118]}
          zoom={5}
          scrollWheelZoom={false}
          className='h-[440px] w-full lg:h-[500px]'
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <MapController targetCoord={selectedCoord} />
          <ResetViewButton />

          {/* latest earthquake marker */}
          {newestEarthquake && latestCoord && (
            <Marker
              position={latestCoord}
              icon={createMarkerIcon(newestEarthquake.magnitude, true, false)}
            >
              <Popup>
                <section className='min-w-[210px]'>
                  <section className='mb-2 flex items-center justify-between border-b border-gray-200 pb-1.5 dark:border-zinc-700'>
                    <span className='border border-red-600 bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white'>
                      GEMPA TERBARU
                    </span>
                    <span className='pr-5 text-xs font-bold text-red-600 dark:text-red-400'>
                      M {newestEarthquake.magnitude}
                    </span>
                  </section>
                  <h4 className='text-xs font-bold leading-snug text-gray-900 dark:text-zinc-100'>
                    {newestEarthquake.wilayah}
                  </h4>
                  <section className='mt-2 flex flex-col border-t border-gray-100 pt-1.5 text-[11px] text-gray-700 dark:border-zinc-800 dark:text-zinc-300'>
                    <p>
                      <span className='font-bold text-gray-900 dark:text-zinc-100'>
                        Kedalaman:
                      </span>{' '}
                      {newestEarthquake.kedalaman}
                    </p>
                    <p>
                      <span className='font-bold text-gray-900 dark:text-zinc-100'>
                        Waktu:
                      </span>{' '}
                      {newestEarthquake.tanggal} &bull; {newestEarthquake.jam}
                    </p>
                    {newestEarthquake.potensi && (
                      <p>
                        <span className='font-bold text-gray-900 dark:text-zinc-100'>
                          Potensi:
                        </span>{' '}
                        {newestEarthquake.potensi}
                      </p>
                    )}
                  </section>
                </section>
              </Popup>
            </Marker>
          )}

          {/* m 5.0+ earthquakes */}
          {show5Min &&
            earthquakes5Min &&
            earthquakes5Min.map((eq, index) => {
              const coord = parseEarthquakeCoordinates(
                eq.coordinates,
                eq.lintang,
                eq.bujur,
              );
              if (!coord) return null;

              return (
                <Marker
                  key={`m5-${index}`}
                  position={coord}
                  icon={createMarkerIcon(eq.magnitude, false, false)}
                >
                  <Popup>
                    <section className='min-w-[210px]'>
                      <section className='mb-2 flex items-center justify-between border-b border-gray-200 pb-1.5 dark:border-zinc-700'>
                        <span className='border border-red-600 bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white'>
                          M 5.0+
                        </span>
                        <span className='pr-5 text-xs font-bold text-red-600 dark:text-red-400'>
                          M {eq.magnitude}
                        </span>
                      </section>
                      <h4 className='text-xs font-bold leading-snug text-gray-900 dark:text-zinc-100'>
                        {eq.wilayah}
                      </h4>
                      <section className='mt-2 flex flex-col border-t border-gray-100 pt-1.5 text-[11px] text-gray-700 dark:border-zinc-800 dark:text-zinc-300'>
                        <p>
                          <span className='font-bold text-gray-900 dark:text-zinc-100'>
                            Kedalaman:
                          </span>{' '}
                          {eq.kedalaman}
                        </p>
                        <p>
                          <span className='font-bold text-gray-900 dark:text-zinc-100'>
                            Waktu:
                          </span>{' '}
                          {eq.tanggal} &bull; {eq.jam}
                        </p>
                        {eq.potensi && (
                          <p>
                            <span className='font-bold text-gray-900 dark:text-zinc-100'>
                              Potensi:
                            </span>{' '}
                            {eq.potensi}
                          </p>
                        )}
                      </section>
                    </section>
                  </Popup>
                </Marker>
              );
            })}

          {/* felt earthquakes */}
          {showFelt &&
            earthquakesFelt &&
            earthquakesFelt.map((eq, index) => {
              const coord = parseEarthquakeCoordinates(
                eq.coordinates,
                eq.lintang,
                eq.bujur,
              );
              if (!coord) return null;

              return (
                <Marker
                  key={`felt-${index}`}
                  position={coord}
                  icon={createMarkerIcon(eq.magnitude, false, true)}
                >
                  <Popup>
                    <section className='min-w-[210px]'>
                      <section className='mb-2 flex items-center justify-between border-b border-gray-200 pb-1.5 dark:border-zinc-700'>
                        <span className='border border-amber-600 bg-amber-600 px-2 py-0.5 text-[10px] font-bold text-white'>
                          DIRASAKAN
                        </span>
                        <span className='pr-5 text-xs font-bold text-amber-600 dark:text-amber-400'>
                          M {eq.magnitude}
                        </span>
                      </section>
                      <h4 className='text-xs font-bold leading-snug text-gray-900 dark:text-zinc-100'>
                        {eq.wilayah}
                      </h4>
                      <section className='mt-2 flex flex-col border-t border-gray-100 pt-1.5 text-[11px] text-gray-700 dark:border-zinc-800 dark:text-zinc-300'>
                        <p>
                          <span className='font-bold text-gray-900 dark:text-zinc-100'>
                            Kedalaman:
                          </span>{' '}
                          {eq.kedalaman}
                        </p>
                        <p>
                          <span className='font-bold text-gray-900 dark:text-zinc-100'>
                            Waktu:
                          </span>{' '}
                          {eq.tanggal} &bull; {eq.jam}
                        </p>
                        {eq.dirasakan && (
                          <p>
                            <span className='font-bold text-gray-900 dark:text-zinc-100'>
                              Dirasakan:
                            </span>{' '}
                            {eq.dirasakan}
                          </p>
                        )}
                      </section>
                    </section>
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>

        {/* legend overlay on map */}
        <section className='absolute bottom-4 right-4 z-[1000] border border-gray-300 bg-white p-3 text-xs shadow-none dark:border-zinc-700 dark:bg-zinc-900'>
          <p className='mb-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-900 dark:text-zinc-100'>
            Keterangan Pin:
          </p>
          <section className='flex items-center gap-2'>
            <span className='size-3 bg-red-600'></span>
            <span className='font-medium text-gray-800 dark:text-zinc-200'>
              Gempa Terbaru
            </span>
          </section>
          <section className='mt-1 flex items-center gap-2'>
            <span className='size-3 bg-red-500'></span>
            <span className='font-medium text-gray-800 dark:text-zinc-200'>
              Magnitudo &ge; 5.0
            </span>
          </section>
          <section className='mt-1 flex items-center gap-2'>
            <span className='size-3 bg-amber-600'></span>
            <span className='font-medium text-gray-800 dark:text-zinc-200'>
              Gempa Dirasakan
            </span>
          </section>
        </section>
      </section>
    </section>
  );
}

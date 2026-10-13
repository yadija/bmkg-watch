import { Card, CardBody, Typography } from '@material-tailwind/react';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

import { EarthquakeData, NewestEarthquake } from '../../interface';

interface EarthquakeMapProps {
  newestEarthquake: NewestEarthquake | null;
  earthquakes5Min: EarthquakeData[] | null;
  earthquakesFelt: EarthquakeData[] | null;
  selectedCoord: [number, number] | null;
}

type FilterMode = 'all' | 'm5' | 'felt';

// Controller to smoothly fly to coordinates when an earthquake is selected
function MapController({ targetCoord }: { targetCoord: [number, number] | null }) {
  const map = useMap();

  useEffect(() => {
    if (targetCoord) {
      map.flyTo(targetCoord, 8, { duration: 1.2 });
    }
  }, [targetCoord, map]);

  return null;
}

// Reset view button control inside map
function ResetViewButton() {
  const map = useMap();

  return (
    <button
      onClick={() => map.setView([-2.5, 118], 5)}
      className='absolute bottom-5 left-5 z-[1000] rounded-md bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg'
      title='Pusatkan ke seluruh Indonesia'
    >
      Reset Tampilan
    </button>
  );
}

// Custom circular marker with magnitude label
const createMarkerIcon = (
  magnitude: string | number,
  isLatest: boolean,
  isFelt: boolean,
) => {
  const magNum = Number(magnitude);
  const bgColor = isLatest ? '#dc2626' : isFelt ? '#d97706' : '#ef4444';
  const shadow = isLatest
    ? 'box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.4), 0 2px 6px rgba(0,0,0,0.4);'
    : 'box-shadow: 0 2px 5px rgba(0,0,0,0.3);';

  return L.divIcon({
    className: 'custom-earthquake-pin',
    html: `
      <div style="
        background-color: ${bgColor};
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 11px;
        border: 2px solid white;
        cursor: pointer;
        ${shadow}
      ">
        ${!isNaN(magNum) && magNum > 0 ? magNum.toFixed(1) : 'M'}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
};

export default function EarthquakeMap({
  newestEarthquake,
  earthquakes5Min,
  earthquakesFelt,
  selectedCoord,
}: EarthquakeMapProps) {
  const [filter, setFilter] = useState<FilterMode>('all');

  // Parse latest earthquake coordinates
  const latestCoord: [number, number] | null = (() => {
    if (!newestEarthquake?.coordinates || newestEarthquake.coordinates.length < 2) {
      if (newestEarthquake?.lintang && newestEarthquake?.bujur) {
        const latVal = parseFloat(newestEarthquake.lintang);
        const lat = newestEarthquake.lintang.includes('LS') ? -latVal : latVal;
        const lonVal = parseFloat(newestEarthquake.bujur);
        const lon = newestEarthquake.bujur.includes('BB') ? -lonVal : lonVal;
        if (!isNaN(lat) && !isNaN(lon)) return [lat, lon];
      }
      return null;
    }
    const lat = Number(newestEarthquake.coordinates[0]);
    const lon = Number(newestEarthquake.coordinates[1]);
    return !isNaN(lat) && !isNaN(lon) ? [lat, lon] : null;
  })();

  const show5Min = filter === 'all' || filter === 'm5';
  const showFelt = filter === 'all' || filter === 'felt';

  return (
    <Card className='my-5 overflow-hidden shadow-sm'>
      <div className='flex flex-wrap items-center justify-between border-b bg-gray-50/50 p-4'>
        <div>
          <Typography variant='h2' className='text-xl font-bold text-blue-gray-900'>
            Peta Sebaran Gempa Bumi Indonesia
          </Typography>
          <Typography variant='small' className='text-gray-600'>
            Satu peta terpadu untuk memantau semua titik episentrum gempa BMKG
          </Typography>
        </div>

        {/* Filter Badges */}
        <div className='mt-2 flex gap-2 sm:mt-0'>
          <button
            onClick={() => setFilter('all')}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Semua Gempa
          </button>
          <button
            onClick={() => setFilter('m5')}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              filter === 'm5'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            M 5.0+ ({earthquakes5Min?.length || 0})
          </button>
          <button
            onClick={() => setFilter('felt')}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              filter === 'felt'
                ? 'bg-amber-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Dirasakan ({earthquakesFelt?.length || 0})
          </button>
        </div>
      </div>

      <CardBody className='relative p-0'>
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

          {/* Latest Earthquake Marker */}
          {newestEarthquake && latestCoord && (
            <Marker
              position={latestCoord}
              icon={createMarkerIcon(newestEarthquake.magnitude, true, false)}
            >
              <Popup>
                <div className='p-1'>
                  <span className='mb-1 inline-block rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white'>
                    GEMPA TERBARU
                  </span>
                  <h4 className='text-sm font-bold text-gray-900'>
                    {newestEarthquake.wilayah}
                  </h4>
                  <div className='mt-1 text-xs text-gray-700'>
                    <p>
                      <strong>Magnitudo:</strong> {newestEarthquake.magnitude}
                    </p>
                    <p>
                      <strong>Kedalaman:</strong> {newestEarthquake.kedalaman}
                    </p>
                    <p>
                      <strong>Waktu:</strong> {newestEarthquake.tanggal} &bull;{' '}
                      {newestEarthquake.jam}
                    </p>
                    <p>
                      <strong>Potensi:</strong> {newestEarthquake.potensi}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          )}

          {/* M 5.0+ Earthquakes */}
          {show5Min &&
            earthquakes5Min &&
            earthquakes5Min.map((eq, index) => {
              const lat = Number(eq.coordinates[0]);
              const lon = Number(eq.coordinates[1]);
              if (isNaN(lat) || isNaN(lon)) return null;

              return (
                <Marker
                  key={`m5-${index}`}
                  position={[lat, lon]}
                  icon={createMarkerIcon(eq.magnitude, false, false)}
                >
                  <Popup>
                    <div className='p-1'>
                      <span className='mb-1 inline-block rounded bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white'>
                        M 5.0+
                      </span>
                      <h4 className='text-sm font-bold text-gray-900'>{eq.wilayah}</h4>
                      <div className='mt-1 text-xs text-gray-700'>
                        <p>
                          <strong>Magnitudo:</strong> {eq.magnitude}
                        </p>
                        <p>
                          <strong>Kedalaman:</strong> {eq.kedalaman}
                        </p>
                        <p>
                          <strong>Waktu:</strong> {eq.tanggal} &bull; {eq.jam}
                        </p>
                        {eq.potensi && (
                          <p>
                            <strong>Potensi:</strong> {eq.potensi}
                          </p>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

          {/* Felt Earthquakes */}
          {showFelt &&
            earthquakesFelt &&
            earthquakesFelt.map((eq, index) => {
              const lat = Number(eq.coordinates[0]);
              const lon = Number(eq.coordinates[1]);
              if (isNaN(lat) || isNaN(lon)) return null;

              return (
                <Marker
                  key={`felt-${index}`}
                  position={[lat, lon]}
                  icon={createMarkerIcon(eq.magnitude, false, true)}
                >
                  <Popup>
                    <div className='p-1'>
                      <span className='mb-1 inline-block rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white'>
                        DIRASAKAN
                      </span>
                      <h4 className='text-sm font-bold text-gray-900'>{eq.wilayah}</h4>
                      <div className='mt-1 text-xs text-gray-700'>
                        <p>
                          <strong>Magnitudo:</strong> {eq.magnitude}
                        </p>
                        <p>
                          <strong>Kedalaman:</strong> {eq.kedalaman}
                        </p>
                        <p>
                          <strong>Waktu:</strong> {eq.tanggal} &bull; {eq.jam}
                        </p>
                        {eq.dirasakan && (
                          <p>
                            <strong>Dirasakan (MMI):</strong> {eq.dirasakan}
                          </p>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>

        {/* Legend Overlay on Map */}
        <div className='absolute bottom-3 right-3 z-[1000] rounded-lg bg-white/95 p-2.5 text-xs shadow-md backdrop-blur-sm'>
          <p className='mb-1 font-bold text-gray-800'>Keterangan Pin:</p>
          <div className='flex items-center gap-2'>
            <span className='size-3.5 rounded-full bg-red-600 ring-2 ring-red-300'></span>
            <span className='text-gray-700'>Gempa Terbaru</span>
          </div>
          <div className='mt-1 flex items-center gap-2'>
            <span className='size-3 rounded-full bg-red-500'></span>
            <span className='text-gray-700'>Magnitudo &ge; 5.0</span>
          </div>
          <div className='mt-1 flex items-center gap-2'>
            <span className='size-3 rounded-full bg-amber-500'></span>
            <span className='text-gray-700'>Gempa Dirasakan</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

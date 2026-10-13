import {
  Card,
  CardBody,
  Dialog,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import WeatherContent from '@/components/weather/WeatherContent';
import { DEFAULT_ADM4 } from '@/constants';
import { fetchNewestEarthquake, fetchWeather } from '@/services';
import { BmkgWeatherResponse, NewestEarthquake } from '@/types';

const POPULAR_CITIES = [
  { name: 'Jakarta Pusat (DKI Jakarta)', adm4: '31.71.03.1001' },
  { name: 'Kota Bandung (Jawa Barat)', adm4: '32.73.01.1001' },
  { name: 'Kota Surabaya (Jawa Timur)', adm4: '35.78.01.1001' },
  { name: 'Kota Semarang (Jawa Tengah)', adm4: '33.74.01.1001' },
  { name: 'Kota Yogyakarta (DIY)', adm4: '34.71.01.1001' },
  { name: 'Kota Denpasar (Bali)', adm4: '51.71.01.1001' },
  { name: 'Kota Medan (Sumatera Utara)', adm4: '12.71.01.1001' },
  { name: 'Kota Makassar (Sulawesi Selatan)', adm4: '73.71.01.1001' },
  { name: 'Kota Balikpapan (Kalimantan Timur)', adm4: '64.71.01.1001' },
  { name: 'Kota Palembang (Sumatera Selatan)', adm4: '16.71.01.1001' },
];

export default function HomePage() {
  const [newestEarthquake, setNewestEarthquake] = useState<NewestEarthquake | null>(null);
  const [weather, setWeather] = useState<BmkgWeatherResponse | null>(null);
  const [adm4, setAdm4] = useState<string>(DEFAULT_ADM4);
  const [loadingWeather, setLoadingWeather] = useState<boolean>(true);

  // dialog
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prev) => !prev);

  const loadWeather = async (targetAdm4: string) => {
    setLoadingWeather(true);
    const data = await fetchWeather(targetAdm4);
    setWeather(data);
    setLoadingWeather(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      loadWeather(DEFAULT_ADM4);

      const earthquake = await fetchNewestEarthquake();
      setNewestEarthquake(earthquake);
    };

    fetchData();
  }, []);

  const handleCityChange = (newAdm4: string) => {
    setAdm4(newAdm4);
    loadWeather(newAdm4);
  };

  return (
    <>
      <header className='mb-5 rounded-lg border border-green-200 bg-green-100 p-4 shadow-sm'>
        <Typography variant='paragraph' className='text-lg font-semibold text-green-900'>
          Data ini diperoleh langsung dari <span className='font-bold'>BMKG</span> (Badan
          Meteorologi, Klimatologi, dan Geofisika Indonesia).
        </Typography>
        <Typography variant='paragraph' className='mt-1 text-sm text-green-800'>
          BMKG bertanggung jawab untuk menyediakan informasi resmi terkait cuaca, iklim,
          dan aktivitas seismik di seluruh Indonesia. Untuk informasi lebih lanjut,
          silakan kunjungi situs web{' '}
          <a
            href='https://www.bmkg.go.id'
            target='_blank'
            className='font-semibold text-blue-700 underline hover:text-blue-900'
            rel='noreferrer'
          >
            bmkg.go.id
          </a>
          .
        </Typography>
      </header>

      <section className='flex min-h-[calc(100vh-160px)] flex-col-reverse gap-5 lg:flex-row'>
        <section className='flex-1'>
          <section className='mb-2 flex items-center justify-between'>
            <Typography
              variant='h1'
              className='text-2xl font-semibold text-blue-gray-900'
            >
              Perkiraan Cuaca Hari Ini
            </Typography>
            <Link
              to='/weather'
              className='text-sm font-medium text-blue-600 underline hover:text-blue-800'
            >
              lihat semua kota &rarr;
            </Link>
          </section>

          <div className='mb-4 max-w-sm'>
            <Select
              variant='outlined'
              label='-- Pilih Kota Populer --'
              value={adm4}
              onChange={(value) => {
                if (value) handleCityChange(value);
              }}
            >
              {POPULAR_CITIES.map((city) => (
                <Option key={city.adm4} value={city.adm4}>
                  {city.name}
                </Option>
              ))}
            </Select>
          </div>

          {loadingWeather ? (
            <Card className='w-full animate-pulse shadow-sm'>
              <CardBody>
                <div className='mb-3 h-6 w-60 rounded bg-gray-300'></div>
                <div className='h-72 w-full rounded bg-gray-200'></div>
              </CardBody>
            </Card>
          ) : weather ? (
            <Card className='shadow-sm'>
              <CardBody>
                <div className='flex items-baseline justify-between'>
                  <Typography variant='h2' className='text-xl font-semibold'>
                    {weather.lokasi.kotkab},{' '}
                    <span className='text-sm font-normal text-gray-600'>
                      {weather.lokasi.provinsi}
                    </span>
                  </Typography>
                  <span className='text-xs text-gray-500'>
                    Zona: {weather.lokasi.timezone}
                  </span>
                </div>

                <WeatherContent weatherData={weather} maxDays={1} />
              </CardBody>
            </Card>
          ) : (
            <Card className='border border-red-200 bg-red-50 p-6 text-center text-red-700'>
              <Typography variant='paragraph'>
                Gagal memuat cuaca. Silakan pilih kota lain atau refresh halaman.
              </Typography>
            </Card>
          )}
        </section>

        <section className='w-full lg:w-[350px]'>
          {newestEarthquake ? (
            <Card className='sticky top-2 rounded-lg border p-4 shadow-md'>
              <CardBody className='flex flex-col'>
                <Typography
                  variant='h1'
                  className='mb-2 text-center text-2xl font-bold text-blue-gray-900'
                >
                  Info Gempa Terbaru
                </Typography>
                <button
                  className='m-auto w-full transition-transform hover:scale-[1.02]'
                  onClick={handleOpen}
                >
                  <img
                    src={`https://data.bmkg.go.id/DataMKG/TEWS/${newestEarthquake.shakemap}`}
                    alt='Shakemap'
                    className='h-auto w-full cursor-pointer overflow-hidden rounded shadow-sm transition-opacity hover:opacity-90'
                    title={newestEarthquake.wilayah}
                  />
                </button>
                <div className='mt-3 text-xs text-gray-600'>
                  <p className='font-semibold text-gray-800'>
                    {newestEarthquake.wilayah}
                  </p>
                  <p>
                    Magnitudo:{' '}
                    <span className='font-bold text-red-600'>
                      {newestEarthquake.magnitude}
                    </span>{' '}
                    &bull; Kedalaman: {newestEarthquake.kedalaman}
                  </p>
                  <p>
                    {newestEarthquake.tanggal} {newestEarthquake.jam}
                  </p>
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card className='sticky top-2 rounded-lg border p-4 shadow-md'>
              <CardBody>
                <Typography variant='h1' className='mb-2 text-center text-2xl font-bold'>
                  Info Gempa Terbaru
                </Typography>

                <section className='m-auto w-full animate-pulse'>
                  <section className='grid h-[300px] w-full place-items-center overflow-hidden rounded bg-gray-300'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      stroke='currentColor'
                      className='size-12 text-gray-500'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                      />
                    </svg>
                  </section>
                </section>
              </CardBody>
            </Card>
          )}
        </section>
      </section>

      <Dialog size='sm' open={open} handler={handleOpen}>
        <img
          src={`https://data.bmkg.go.id/DataMKG/TEWS/${newestEarthquake?.shakemap}`}
          alt='Shakemap'
          className='h-auto w-full rounded'
        />
      </Dialog>
    </>
  );
}

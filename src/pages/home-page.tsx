import { useEffect, useRef, useState } from 'react';
import {
  LuActivity,
  LuAlertTriangle,
  LuClock,
  LuExternalLink,
  LuLayers,
  LuMapPin,
  LuRadio,
} from 'react-icons/lu';
import { Link } from 'react-router-dom';

import ShakemapPreview from '@/components/earthquake/shakemap-preview';
import WeatherContent from '@/components/weather/weather-content';
import { DEFAULT_ADM4 } from '@/constants';
import { fetchNewestEarthquake, fetchWeather } from '@/services';
import { BmkgWeatherResponse, NewestEarthquake } from '@/types';
import { formatEarthquakeTime, getTimezoneAbbr } from '@/utils';

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

  const weatherAbortRef = useRef<AbortController | null>(null);

  const loadWeather = async (targetAdm4: string) => {
    if (weatherAbortRef.current) {
      weatherAbortRef.current.abort();
    }
    const controller = new AbortController();
    weatherAbortRef.current = controller;

    setLoadingWeather(true);
    const data = await fetchWeather(targetAdm4, controller.signal);
    if (!controller.signal.aborted) {
      setWeather(data);
      setLoadingWeather(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      loadWeather(DEFAULT_ADM4);

      const earthquake = await fetchNewestEarthquake();
      setNewestEarthquake(earthquake);
    };

    fetchData();

    return () => {
      if (weatherAbortRef.current) {
        weatherAbortRef.current.abort();
      }
    };
  }, []);

  const handleCityChange = (newAdm4: string) => {
    setAdm4(newAdm4);
    loadWeather(newAdm4);
  };

  return (
    <>
      {/* official bmkg notice banner - uniform border, flat accent tag */}
      <header className='mb-6 border border-gray-300 bg-white p-4 shadow-none dark:border-zinc-800 dark:bg-zinc-900'>
        <section className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <section className='flex items-center gap-3'>
            <span className='inline-flex shrink-0 items-center border border-teal-700 bg-teal-700 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white'>
              Resmi BMKG
            </span>
            <section>
              <p className='text-sm font-bold text-gray-900 dark:text-zinc-100'>
                Portal Pemantau Data Meteorologi & Seismik Indonesia
              </p>
              <p className='mt-0.5 text-xs text-gray-700 dark:text-zinc-300'>
                Informasi resmi disinkronkan secara langsung dari sistem BMKG (Badan
                Meteorologi, Klimatologi, dan Geofisika).
              </p>
            </section>
          </section>

          <a
            href='https://www.bmkg.go.id'
            target='_blank'
            rel='noreferrer'
            className='inline-flex shrink-0 items-center justify-center gap-1.5 self-start border border-gray-400 bg-gray-50 px-3 py-2 text-xs font-bold leading-none text-gray-900 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 sm:self-center'
          >
            <span className='leading-none'>Situs bmkg.go.id</span>
            <LuExternalLink size={14} className='shrink-0' />
          </a>
        </section>
      </header>

      {/* main content grid: 8 cols weather, 4 cols earthquake */}
      <section className='grid grid-cols-1 items-start gap-6 lg:grid-cols-12'>
        {/* left column: weather dashboard */}
        <section className='flex flex-col gap-5 lg:col-span-8'>
          {/* section heading bar with consistent height and font size */}
          <section className='flex flex-col gap-2 border-b border-gray-300 pb-3 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between'>
            <section>
              <h1 className='text-lg font-bold tracking-tight text-gray-900 dark:text-zinc-100'>
                Prakiraan Cuaca Hari Ini
              </h1>
              <p className='mt-0.5 text-xs text-gray-700 dark:text-zinc-400'>
                Perkiraan kondisi cuaca, suhu, kelembaban, dan angin per interval waktu
              </p>
            </section>

            <Link
              to='/weather'
              className='inline-flex items-center justify-center border border-blue-600 bg-blue-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-700'
            >
              Lihat 140+ Kota &rarr;
            </Link>
          </section>

          {/* city selector toolbar with quick chips */}
          <section className='border border-gray-300 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900'>
            <p className='mb-2 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-zinc-300'>
              Pilih Wilayah Pantauan:
            </p>
            <section className='flex flex-wrap items-center gap-2'>
              <section className='w-full sm:w-72'>
                <select
                  aria-label='Pilih Wilayah Pantauan'
                  value={adm4}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className='h-10 w-full rounded-none border border-gray-300 bg-white px-3 py-2 text-xs font-bold text-gray-900 transition-colors focus:border-gray-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-400'
                >
                  {POPULAR_CITIES.map((city) => (
                    <option
                      key={city.adm4}
                      value={city.adm4}
                      className='py-1 text-xs font-bold text-gray-900 dark:bg-zinc-800 dark:text-zinc-100'
                    >
                      {city.name}
                    </option>
                  ))}
                </select>
              </section>

              {/* quick chips for top cities */}
              <section className='flex flex-wrap gap-1.5 pt-1 sm:pt-0'>
                {POPULAR_CITIES.slice(0, 5).map((city) => {
                  const isActive = city.adm4 === adm4;
                  return (
                    <button
                      key={city.adm4}
                      onClick={() => handleCityChange(city.adm4)}
                      className={`h-10 rounded-none border px-3 text-xs font-bold transition-colors ${
                        isActive
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-gray-300 bg-white text-gray-800 hover:border-gray-900 hover:text-gray-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100'
                      }`}
                    >
                      {city.name.split(' (')[0].replace('Kota ', '')}
                    </button>
                  );
                })}
              </section>
            </section>
          </section>

          {/* weather content display card - uniform border, no border-top */}
          {loadingWeather ? (
            <section className='animate-pulse rounded-none border border-gray-300 bg-white p-6 shadow-none dark:border-zinc-800 dark:bg-zinc-900'>
              <section className='mb-4 h-6 w-56 bg-gray-200 dark:bg-zinc-800'></section>
              <section className='h-64 w-full bg-gray-100 dark:bg-zinc-800/60'></section>
            </section>
          ) : weather ? (
            <section className='rounded-none border border-gray-300 bg-white shadow-none dark:border-zinc-800 dark:bg-zinc-900'>
              {/* location and timezone bar */}
              <section className='flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-200 bg-gray-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/80'>
                <section>
                  <h2 className='text-base font-bold text-gray-900 dark:text-zinc-100'>
                    {weather.lokasi.kotkab},{' '}
                    <span className='font-normal text-gray-700 dark:text-zinc-400'>
                      {weather.lokasi.provinsi}
                    </span>
                  </h2>
                  <p className='mt-0.5 text-xs text-gray-700 dark:text-zinc-400'>
                    Kecamatan: {weather.lokasi.kecamatan || '-'} &bull; Koordinat:{' '}
                    {weather.lokasi.lat}, {weather.lokasi.lon}
                  </p>
                </section>
                <span className='border border-gray-300 bg-white px-2.5 py-1 text-xs font-bold text-gray-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'>
                  Zona: {getTimezoneAbbr(weather.lokasi.timezone)} (
                  {weather.lokasi.timezone})
                </span>
              </section>

              <section className='p-4 pt-1'>
                <WeatherContent weatherData={weather} maxDays={1} />
              </section>
            </section>
          ) : (
            <section className='rounded-none border border-red-300 bg-red-50 p-6 text-red-900 shadow-none dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300'>
              <p className='font-bold'>
                Gagal memuat data cuaca untuk wilayah ini. Silakan pilih wilayah lain atau
                muat ulang halaman.
              </p>
            </section>
          )}
        </section>

        {/* right column: earthquake card */}
        <section className='lg:col-span-4'>
          {newestEarthquake ? (
            <section className='sticky top-4 rounded-none border border-gray-300 bg-white shadow-none dark:border-zinc-800 dark:bg-zinc-900'>
              {/* card header */}
              <section className='flex items-center justify-between border-b border-gray-200 bg-gray-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/80'>
                <h2 className='text-base font-bold text-gray-900 dark:text-zinc-100'>
                  Info Gempa Terbaru
                </h2>
                <span className='border border-red-600 bg-red-600 px-2.5 py-1 text-xs font-bold tracking-wider text-white'>
                  M {newestEarthquake.magnitude}
                </span>
              </section>

              <section className='flex flex-col gap-4 p-4'>
                {/* shakemap image */}
                <ShakemapPreview shakemap={newestEarthquake.shakemap} />

                {/* flat earthquake metrics tiles with high contrast and consistent height */}
                <section className='flex flex-col gap-2'>
                  <section className='border border-gray-200 bg-gray-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/60'>
                    <section className='flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-zinc-300'>
                      <LuMapPin size={14} className='text-red-600 dark:text-red-400' />
                      <span>Pusat Episentrum</span>
                    </section>
                    <p className='mt-1 text-sm font-bold text-gray-900 dark:text-zinc-100'>
                      {newestEarthquake.wilayah}
                    </p>
                  </section>

                  <section className='grid grid-cols-2 gap-2'>
                    <section className='flex h-20 flex-col justify-between border border-gray-200 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-900'>
                      <section className='flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-700 dark:text-zinc-400'>
                        <LuActivity
                          size={13}
                          className='text-red-600 dark:text-red-400'
                        />
                        <span>Magnitudo</span>
                      </section>
                      <p className='text-xl font-bold text-red-600 dark:text-red-400'>
                        M {newestEarthquake.magnitude}
                      </p>
                    </section>

                    <section className='flex h-20 flex-col justify-between border border-gray-200 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-900'>
                      <section className='flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-700 dark:text-zinc-400'>
                        <LuLayers
                          size={13}
                          className='text-blue-600 dark:text-blue-400'
                        />
                        <span>Kedalaman</span>
                      </section>
                      <p className='text-lg font-bold text-gray-900 dark:text-zinc-100'>
                        {newestEarthquake.kedalaman}
                      </p>
                    </section>
                  </section>

                  <section className='border border-gray-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900'>
                    <section className='flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-700 dark:text-zinc-400'>
                      <LuClock size={13} className='text-gray-700 dark:text-zinc-400' />
                      <span>Waktu Terjadinya</span>
                    </section>
                    <p className='mt-1 text-xs font-bold text-gray-900 dark:text-zinc-100'>
                      {newestEarthquake.tanggal} &bull;{' '}
                      {formatEarthquakeTime(newestEarthquake.jam)}
                    </p>
                  </section>

                  {newestEarthquake.potensi && (
                    <section className='border border-amber-300 bg-amber-50 p-3 dark:border-amber-700/60 dark:bg-amber-950/40'>
                      <section className='flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300'>
                        <LuAlertTriangle
                          size={13}
                          className='text-amber-800 dark:text-amber-400'
                        />
                        <span>Potensi Tsunami</span>
                      </section>
                      <p className='mt-1 text-xs font-bold text-amber-900 dark:text-amber-300'>
                        {newestEarthquake.potensi}
                      </p>
                    </section>
                  )}

                  {newestEarthquake.dirasakan && (
                    <section className='border border-blue-300 bg-blue-50 p-3 dark:border-blue-700/60 dark:bg-blue-950/40'>
                      <section className='flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300'>
                        <LuRadio size={13} className='text-blue-800 dark:text-blue-400' />
                        <span>Dirasakan (MMI)</span>
                      </section>
                      <p className='mt-1 text-xs font-bold text-blue-900 dark:text-blue-300'>
                        {newestEarthquake.dirasakan}
                      </p>
                    </section>
                  )}
                </section>

                {/* cta link to full earthquake page */}
                <Link
                  to='/earthquake'
                  className='flex h-10 items-center justify-center border border-gray-900 bg-gray-900 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-gray-800 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200'
                >
                  Buka Peta Gempa Terpadu &rarr;
                </Link>
              </section>
            </section>
          ) : (
            <section className='animate-pulse rounded-none border border-gray-300 bg-white p-5 shadow-none dark:border-zinc-800 dark:bg-zinc-900'>
              <section className='mb-3 h-5 w-44 bg-gray-200 dark:bg-zinc-800'></section>
              <section className='h-64 w-full bg-gray-100 dark:bg-zinc-800/60'></section>
            </section>
          )}
        </section>
      </section>
    </>
  );
}

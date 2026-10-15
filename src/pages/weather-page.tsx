import { useState } from 'react';

import WeatherContent from '@/components/weather/weather-content';
import { DEFAULT_ADM4, DEFAULT_PROVINCE_KEY, REGIONS } from '@/constants';
import { useWeather } from '@/hooks';
import { getTimezoneAbbr } from '@/utils';

export default function WeatherPage() {
  const [provinceKey, setProvinceKey] = useState<string>(DEFAULT_PROVINCE_KEY);
  const { weather, loading, adm4, setAdm4, loadWeather } = useWeather(DEFAULT_ADM4);

  const handleProvinceChange = (newProvinceKey: string) => {
    setProvinceKey(newProvinceKey);
    const cities = REGIONS[newProvinceKey]?.cities || [];
    if (cities.length > 0) {
      const defaultCityAdm4 = cities[0].adm4;
      setAdm4(defaultCityAdm4);
      loadWeather(defaultCityAdm4);
    }
  };

  const handleCityChange = (newAdm4: string) => {
    setAdm4(newAdm4);
    loadWeather(newAdm4);
  };

  const currentCities = REGIONS[provinceKey]?.cities || [];
  const locationInfo = weather?.lokasi;

  return (
    <section className='min-h-[calc(100vh-160px)] py-4'>
      {/* page header notice banner - uniform border, flat accent tag */}
      <header className='mb-6 border border-gray-300 bg-white p-4 shadow-none dark:border-zinc-800 dark:bg-zinc-900'>
        <section className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <section className='flex items-center gap-3'>
            <span className='inline-flex shrink-0 items-center border border-blue-600 bg-blue-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white'>
              Prakiraan Cuaca
            </span>
            <section>
              <h1 className='text-base font-bold text-gray-900 dark:text-zinc-100'>
                Prakiraan Cuaca Seluruh Wilayah Indonesia
              </h1>
              <p className='mt-0.5 text-xs text-gray-700 dark:text-zinc-300'>
                Data resmi dari sistem Open Data BMKG (Badan Meteorologi, Klimatologi, dan
                Geofisika).
              </p>
            </section>
          </section>

          {locationInfo && (
            <section className='border border-gray-300 bg-gray-50 px-3 py-2 text-xs font-bold text-gray-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'>
              <span>
                {locationInfo.kotkab}, {locationInfo.provinsi}
              </span>
              <span className='block text-[11px] font-normal text-gray-600 dark:text-zinc-400'>
                Kec. {locationInfo.kecamatan} &bull; {locationInfo.lat},{' '}
                {locationInfo.lon}
              </span>
            </section>
          )}
        </section>
      </header>

      {/* filter selectors */}
      <section className='mb-6 border border-gray-300 bg-white p-4 shadow-none dark:border-zinc-800 dark:bg-zinc-900'>
        <p className='mb-3 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-zinc-300'>
          Pilih Wilayah Provinsi & Kabupaten / Kota:
        </p>
        <section className='flex flex-col gap-3 sm:flex-row'>
          <section className='flex-1'>
            <label
              htmlFor='province-select'
              className='mb-1 block text-xs font-bold text-gray-700 dark:text-zinc-300'
            >
              Provinsi
            </label>
            <select
              id='province-select'
              value={provinceKey}
              onChange={(e) => handleProvinceChange(e.target.value)}
              className='h-10 w-full rounded-none border border-gray-300 bg-white px-3 py-2 text-xs font-bold text-gray-900 transition-colors focus:border-gray-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-400'
            >
              {Object.keys(REGIONS).map((key) => (
                <option
                  key={key}
                  value={key}
                  className='py-1 text-xs font-bold text-gray-900 dark:bg-zinc-800 dark:text-zinc-100'
                >
                  {REGIONS[key].name}
                </option>
              ))}
            </select>
          </section>

          <section className='flex-1'>
            <label
              htmlFor='city-select'
              className='mb-1 block text-xs font-bold text-gray-700 dark:text-zinc-300'
            >
              Kabupaten / Kota
            </label>
            <select
              id='city-select'
              value={adm4}
              onChange={(e) => handleCityChange(e.target.value)}
              disabled={currentCities.length === 0}
              className='h-10 w-full rounded-none border border-gray-300 bg-white px-3 py-2 text-xs font-bold text-gray-900 transition-colors focus:border-gray-900 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-400 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-600'
            >
              {currentCities.map((city) => (
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
        </section>
      </section>

      {/* weather display section */}
      {loading ? (
        <section className='animate-pulse rounded-none border border-gray-300 bg-white p-6 shadow-none dark:border-zinc-800 dark:bg-zinc-900'>
          <section className='mb-4 h-6 w-60 bg-gray-200 dark:bg-zinc-800'></section>
          <section className='h-64 w-full bg-gray-100 dark:bg-zinc-800/60'></section>
        </section>
      ) : weather ? (
        <section className='rounded-none border border-gray-300 bg-white shadow-none dark:border-zinc-800 dark:bg-zinc-900'>
          <section className='flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-200 bg-gray-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/80'>
            <section>
              <h2 className='text-base font-bold text-gray-900 dark:text-zinc-100'>
                {locationInfo?.kotkab || 'Lokasi Terpilih'},{' '}
                <span className='font-normal text-gray-700 dark:text-zinc-400'>
                  {locationInfo?.provinsi}
                </span>
              </h2>
              <p className='mt-0.5 text-xs text-gray-700 dark:text-zinc-400'>
                Prakiraan 3 Hari ke Depan &bull; Interval per 3 Jam
              </p>
            </section>
            <span className='border border-gray-300 bg-white px-2.5 py-1 text-xs font-bold text-gray-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'>
              Zona: {getTimezoneAbbr(weather.lokasi.timezone)} ({weather.lokasi.timezone})
            </span>
          </section>

          <section className='p-4 pt-1'>
            <WeatherContent weatherData={weather} />
          </section>
        </section>
      ) : (
        <section className='rounded-none border border-red-300 bg-red-50 p-6 text-red-900 shadow-none dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300'>
          <p className='text-sm font-bold'>
            Gagal memuat data cuaca untuk wilayah ini. Silakan periksa koneksi internet
            atau pilih wilayah lain.
          </p>
        </section>
      )}
    </section>
  );
}

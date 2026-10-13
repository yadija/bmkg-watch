import { Card, CardBody, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

import WeatherContent from '@/components/weather/weather-content';
import { DEFAULT_ADM4, DEFAULT_PROVINCE_KEY, REGIONS } from '@/constants';
import { fetchWeather } from '@/services';
import { BmkgWeatherResponse } from '@/types';

export default function WeatherPage() {
  const [provinceKey, setProvinceKey] = useState<string>(DEFAULT_PROVINCE_KEY);
  const [adm4, setAdm4] = useState<string>(DEFAULT_ADM4);
  const [weather, setWeather] = useState<BmkgWeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadWeather = async (targetAdm4: string) => {
    setLoading(true);
    const data = await fetchWeather(targetAdm4);
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    loadWeather(DEFAULT_ADM4);
  }, []);

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
      <header className='mb-6 border border-gray-300 bg-white p-4 shadow-none'>
        <section className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <section className='flex items-center gap-3'>
            <span className='inline-flex shrink-0 items-center border border-blue-600 bg-blue-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white'>
              Prakiraan Cuaca
            </span>
            <section>
              <Typography variant='h1' className='text-base font-bold text-gray-900'>
                Prakiraan Cuaca Seluruh Wilayah Indonesia
              </Typography>
              <Typography variant='paragraph' className='mt-0.5 text-xs text-gray-700'>
                Data resmi dari sistem Open Data BMKG (Badan Meteorologi, Klimatologi, dan
                Geofisika).
              </Typography>
            </section>
          </section>

          {locationInfo && (
            <section className='border border-gray-300 bg-gray-50 px-3 py-2 text-xs font-bold text-gray-900'>
              <span>
                {locationInfo.kotkab}, {locationInfo.provinsi}
              </span>
              <span className='block text-[11px] font-normal text-gray-600'>
                Kec. {locationInfo.kecamatan} &bull; {locationInfo.lat},{' '}
                {locationInfo.lon}
              </span>
            </section>
          )}
        </section>
      </header>

      {/* filter selectors */}
      <section className='mb-6 border border-gray-300 bg-white p-4 shadow-none'>
        <p className='mb-3 text-xs font-bold uppercase tracking-wider text-gray-700'>
          Pilih Wilayah Provinsi & Kabupaten / Kota:
        </p>
        <section className='flex flex-col gap-3 sm:flex-row'>
          <section className='flex-1'>
            <label
              htmlFor='province-select'
              className='mb-1 block text-xs font-bold text-gray-700'
            >
              Provinsi
            </label>
            <select
              id='province-select'
              value={provinceKey}
              onChange={(e) => handleProvinceChange(e.target.value)}
              className='h-10 w-full rounded-none border border-gray-300 bg-white px-3 py-2 text-xs font-bold text-gray-900 transition-colors focus:border-gray-900 focus:outline-none'
            >
              {Object.keys(REGIONS).map((key) => (
                <option
                  key={key}
                  value={key}
                  className='py-1 text-xs font-bold text-gray-900'
                >
                  {REGIONS[key].name}
                </option>
              ))}
            </select>
          </section>

          <section className='flex-1'>
            <label
              htmlFor='city-select'
              className='mb-1 block text-xs font-bold text-gray-700'
            >
              Kabupaten / Kota
            </label>
            <select
              id='city-select'
              value={adm4}
              onChange={(e) => handleCityChange(e.target.value)}
              disabled={currentCities.length === 0}
              className='h-10 w-full rounded-none border border-gray-300 bg-white px-3 py-2 text-xs font-bold text-gray-900 transition-colors focus:border-gray-900 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400'
            >
              {currentCities.map((city) => (
                <option
                  key={city.adm4}
                  value={city.adm4}
                  className='py-1 text-xs font-bold text-gray-900'
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
        <Card className='animate-pulse rounded-none border border-gray-300 bg-white p-6 shadow-none'>
          <CardBody className='p-0'>
            <section className='mb-4 h-6 w-60 bg-gray-200'></section>
            <section className='h-64 w-full bg-gray-100'></section>
          </CardBody>
        </Card>
      ) : weather ? (
        <Card className='rounded-none border border-gray-300 bg-white shadow-none'>
          <section className='flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-200 bg-gray-50/70 p-4'>
            <section>
              <Typography variant='h2' className='text-base font-bold text-gray-900'>
                {locationInfo?.kotkab || 'Lokasi Terpilih'},{' '}
                <span className='font-normal text-gray-700'>
                  {locationInfo?.provinsi}
                </span>
              </Typography>
              <p className='mt-0.5 text-xs text-gray-700'>
                Prakiraan 3 Hari ke Depan &bull; Interval per 3 Jam
              </p>
            </section>
            <span className='border border-gray-300 bg-white px-2.5 py-1 text-xs font-bold text-gray-900'>
              Zona: {weather.lokasi.timezone}
            </span>
          </section>

          <CardBody className='p-4 pt-1'>
            <WeatherContent weatherData={weather} />
          </CardBody>
        </Card>
      ) : (
        <Card className='rounded-none border border-red-300 bg-red-50 p-6 text-red-900 shadow-none'>
          <Typography variant='paragraph' className='text-sm font-bold'>
            Gagal memuat data cuaca untuk wilayah ini. Silakan periksa koneksi internet
            atau pilih wilayah lain.
          </Typography>
        </Card>
      )}
    </section>
  );
}

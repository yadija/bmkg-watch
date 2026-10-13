import { Card, CardBody, Option, Select, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

import WeatherContent from '@/components/weather/WeatherContent';
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
      <Card className='mb-5 shadow-sm'>
        <CardBody className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
          <section>
            <Typography variant='h1' className='text-2xl font-bold text-blue-gray-900'>
              Prakiraan Cuaca Indonesia
            </Typography>
            <Typography variant='small' className='text-gray-600'>
              Sumber: Open Data Resmi BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)
            </Typography>
          </section>

          {locationInfo && (
            <section className='rounded-lg bg-blue-50 p-3 text-right text-xs text-blue-gray-800'>
              <p className='font-bold text-blue-800'>
                {locationInfo.kotkab}, {locationInfo.provinsi}
              </p>
              <p className='text-gray-600'>
                Kec. {locationInfo.kecamatan} &bull; Koordinat: {locationInfo.lat},{' '}
                {locationInfo.lon}
              </p>
            </section>
          )}
        </CardBody>
      </Card>

      <Card className='mb-5 shadow-sm'>
        <CardBody className='flex flex-col gap-4 sm:flex-row'>
          <section className='flex-1'>
            <Select
              variant='outlined'
              label='-- Pilih Provinsi --'
              value={provinceKey}
              onChange={(value) => {
                if (value) handleProvinceChange(value);
              }}
            >
              {Object.keys(REGIONS).map((key) => (
                <Option key={key} value={key}>
                  {REGIONS[key].name}
                </Option>
              ))}
            </Select>
          </section>

          <section className='flex-1'>
            <Select
              variant='outlined'
              label='-- Pilih Kabupaten / Kota --'
              value={adm4}
              onChange={(value) => {
                if (value) handleCityChange(value);
              }}
              disabled={currentCities.length === 0}
            >
              {currentCities.map((city) => (
                <Option key={city.adm4} value={city.adm4}>
                  {city.name}
                </Option>
              ))}
            </Select>
          </section>
        </CardBody>
      </Card>

      {loading ? (
        <Card className='mt-5 w-full animate-pulse shadow-sm'>
          <CardBody>
            <section className='mb-4 h-6 w-60 rounded bg-gray-300'></section>
            <section className='h-64 w-full rounded bg-gray-200'></section>
          </CardBody>
        </Card>
      ) : weather ? (
        <Card className='mt-5 shadow-sm'>
          <CardBody>
            <section className='flex flex-wrap items-baseline justify-between border-b pb-3'>
              <Typography variant='h2' className='text-xl font-bold text-blue-gray-900'>
                {locationInfo?.kotkab || 'Lokasi Terpilih'}
              </Typography>
              <span className='text-sm text-gray-500'>
                Prakiraan 3 Hari ke Depan (Interval per 3 Jam)
              </span>
            </section>

            <WeatherContent weatherData={weather} />
          </CardBody>
        </Card>
      ) : (
        <Card className='mt-5 border border-red-200 bg-red-50 p-6 text-center text-red-700'>
          <Typography variant='paragraph'>
            Gagal memuat data cuaca untuk wilayah ini. Silakan periksa koneksi internet
            atau pilih wilayah lain.
          </Typography>
        </Card>
      )}
    </section>
  );
}

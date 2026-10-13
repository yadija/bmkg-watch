// import swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Typography } from '@material-tailwind/react';
import { LuCompass, LuDroplets, LuWind } from 'react-icons/lu';
// import required modules
import { Navigation } from 'swiper/modules';
// import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';

import { BmkgWeatherResponse } from '@/types';
import {
  formatDailyWeatherData,
  formatTimeOnly,
  getWindDirectionName,
  isDaytime,
} from '@/utils';

import WeatherIcon from './weather-icon';
import WeatherParameter from './weather-parameter';

interface WeatherContentProps {
  weatherData: BmkgWeatherResponse;
  maxDays?: number;
  limitEntriesPerDay?: number;
}

export default function WeatherContent({
  weatherData,
  maxDays,
  limitEntriesPerDay,
}: WeatherContentProps) {
  const dailyWeather = formatDailyWeatherData(weatherData);
  const displayedDays = maxDays ? dailyWeather.slice(0, maxDays) : dailyWeather;

  if (displayedDays.length === 0) {
    return (
      <Typography
        variant='paragraph'
        className='p-6 text-center text-sm font-medium text-gray-700'
      >
        Data cuaca tidak tersedia untuk wilayah ini.
      </Typography>
    );
  }

  return (
    <>
      {displayedDays.map((day) => {
        const entries = limitEntriesPerDay
          ? day.entries.slice(0, limitEntriesPerDay)
          : day.entries;

        return (
          <section className='mt-4 flex flex-col gap-3' key={day.dateKey}>
            <section className='border-b border-gray-200 pb-2'>
              <p className='text-sm font-bold uppercase tracking-wider text-gray-800'>
                {day.dateLabel}
              </p>
            </section>

            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={12}
              slidesPerView={1}
              className='w-full border border-gray-300 bg-white'
            >
              {entries.map((entry, index) => {
                const time = formatTimeOnly(entry.local_datetime || entry.datetime);
                const isDay = isDaytime(entry.local_datetime || entry.datetime);

                // light-toned surfaces for both day and night ensuring 100% visibility
                const cardBg = isDay
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-50 text-gray-900';

                return (
                  <SwiperSlide key={`${entry.datetime}-${index}`}>
                    <section
                      className={`relative flex cursor-default flex-col gap-4 p-5 transition-colors ${cardBg}`}
                    >
                      {/* header bar: time badge and day/night status */}
                      <section className='flex items-center justify-between border-b border-gray-200 pb-3'>
                        <span className='border border-gray-300 bg-white px-2.5 py-1 text-xs font-bold text-gray-900'>
                          Pukul {time} WIB
                        </span>
                        <span
                          className={`border px-2.5 py-0.5 text-xs font-bold ${
                            isDay
                              ? 'border-amber-300 bg-amber-50 text-amber-900'
                              : 'border-indigo-300 bg-indigo-50 text-indigo-900'
                          }`}
                        >
                          {isDay ? 'Siang Hari' : 'Malam Hari'}
                        </span>
                      </section>

                      {/* center section: weather icon + description + temperature */}
                      <section className='flex flex-col items-center justify-around gap-4 py-3 sm:flex-row'>
                        <section
                          className='flex flex-col items-center'
                          title={entry.weather_desc}
                        >
                          <WeatherIcon
                            imageUrl={entry.image}
                            value={entry.weather}
                            day={isDay}
                            alt={entry.weather_desc}
                          />
                          <Typography
                            variant='h3'
                            className='mt-2 text-center text-lg font-bold capitalize text-gray-900'
                          >
                            {entry.weather_desc}
                          </Typography>
                        </section>

                        <section className='flex items-center justify-center'>
                          <p
                            className='text-5xl font-bold tracking-tight text-gray-900'
                            title='Suhu Udara'
                          >
                            {entry.t}
                            <span className='text-3xl font-semibold text-blue-600'>
                              °C
                            </span>
                          </p>
                        </section>
                      </section>

                      {/* parameters section: 3 equal height cards with lucide flat icons */}
                      <section className='grid grid-cols-3 gap-2 border border-gray-200 bg-gray-50/70 p-2'>
                        <WeatherParameter
                          title='Kelembaban'
                          icon={LuDroplets}
                          value={`${entry.hu}%`}
                        />
                        <WeatherParameter
                          title='Angin'
                          icon={LuWind}
                          value={`${entry.ws} km/j`}
                        />
                        <WeatherParameter
                          title='Arah'
                          icon={LuCompass}
                          value={getWindDirectionName(entry.wd)}
                        />
                      </section>
                    </section>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </section>
        );
      })}
    </>
  );
}

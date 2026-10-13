// import swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Typography } from '@material-tailwind/react';
import { WiHumidity, WiStrongWind, WiWindDeg } from 'react-icons/wi';
// import required modules
import { Navigation } from 'swiper/modules';
// import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';

import { BmkgWeatherResponse } from '../../interface';
import {
  formatDailyWeatherData,
  formatTimeOnly,
  getWindDirectionName,
  isDaytime,
} from '../../utils';
import WeatherIcon from './WeatherIcon';
import WeatherParameter from './WeatherParameter';

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
      <Typography variant='paragraph' className='p-4 text-center text-gray-500'>
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
          <section className='mt-5 grid' key={day.dateKey}>
            <section>
              <p className='p-3 text-lg font-bold text-blue-gray-800'>{day.dateLabel}</p>
            </section>

            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={12}
              slidesPerView={1}
              className='w-full rounded-xl shadow-inner'
            >
              {entries.map((entry, index) => {
                const time = formatTimeOnly(entry.local_datetime || entry.datetime);
                const isDay = isDaytime(entry.local_datetime || entry.datetime);
                const classnameDay = isDay
                  ? 'bg-blue-100 text-blue-gray-800'
                  : 'bg-slate-800 text-gray-200';

                return (
                  <SwiperSlide key={`${entry.datetime}-${index}`}>
                    <section
                      className={`relative flex cursor-default flex-col gap-4 rounded-xl p-4 transition-colors ${classnameDay}`}
                    >
                      <section className='flex items-center justify-between'>
                        <span className='rounded-full bg-black/10 px-3 py-1 text-sm font-bold backdrop-blur-sm dark:bg-white/10'>
                          Pukul {time} WIB
                        </span>
                        <span className='text-xs opacity-75'>
                          {isDay ? '☀️ Siang' : '🌙 Malam'}
                        </span>
                      </section>

                      <section className='flex flex-col items-center justify-around gap-4 py-2 lg:flex-row'>
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
                            className='mt-2 text-center text-xl font-bold capitalize'
                          >
                            {entry.weather_desc}
                          </Typography>
                        </section>

                        <section className='flex items-center justify-center'>
                          <p
                            className='text-6xl font-light tracking-tight'
                            title='Suhu Udara'
                          >
                            {entry.t}
                            <span className='text-3xl font-normal'>°C</span>
                          </p>
                        </section>
                      </section>

                      <section className='grid grid-cols-3 gap-2 rounded-lg bg-black/5 p-3 backdrop-blur-sm dark:bg-white/5 lg:justify-start'>
                        <WeatherParameter
                          title='Kelembaban Udara'
                          icon={WiHumidity}
                          value={`${entry.hu}%`}
                        />
                        <WeatherParameter
                          title='Kecepatan Angin'
                          icon={WiStrongWind}
                          value={`${entry.ws} km/j`}
                        />
                        <WeatherParameter
                          title='Arah Angin'
                          icon={WiWindDeg}
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

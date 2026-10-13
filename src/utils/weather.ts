import { CARD } from '../constant';
import { BmkgWeatherEntry, BmkgWeatherResponse } from '../interface';

export interface FormattedDailyWeather {
  dateLabel: string;
  dateKey: string;
  entries: BmkgWeatherEntry[];
}

/**
 * Format string "YYYY-MM-DD HH:mm:ss" or ISO string to readable Indonesian date
 * Example: "Selasa, 13 Oktober 2026"
 */
export const formatIndonesianDate = (dateTimeStr: string): string => {
  try {
    const cleanDateStr = dateTimeStr.includes(' ')
      ? dateTimeStr.split(' ')[0]
      : dateTimeStr.split('T')[0];
    const parts = cleanDateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return new Date(dateTimeStr).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateTimeStr;
  }
};

/**
 * Extracts "HH:mm" from "YYYY-MM-DD HH:mm:ss"
 */
export const formatTimeOnly = (dateTimeStr: string): string => {
  if (!dateTimeStr) return '';
  const timePart = dateTimeStr.includes(' ')
    ? dateTimeStr.split(' ')[1]
    : dateTimeStr.split('T')[1];
  if (timePart) {
    return timePart.substring(0, 5);
  }
  return dateTimeStr;
};

/**
 * Determine if a given local_datetime or time is during day (06:00 - 17:59)
 */
export const isDaytime = (dateTimeStr: string): boolean => {
  const time = formatTimeOnly(dateTimeStr);
  const hour = parseInt(time.split(':')[0], 10);
  return hour >= 6 && hour < 18;
};

/**
 * Translate cardinal wind direction (e.g. "NW") to Indonesian ("Barat Laut")
 */
export const getWindDirectionName = (cardinal: string): string => {
  if (!cardinal) return 'N/A';
  return CARD[cardinal as keyof typeof CARD] || cardinal;
};

/**
 * Groups and formats the raw BMKG weather response by day
 */
export const formatDailyWeatherData = (
  weatherData: BmkgWeatherResponse,
): FormattedDailyWeather[] => {
  if (!weatherData?.data?.[0]?.cuaca) {
    return [];
  }

  const daysArray = weatherData.data[0].cuaca;
  const result: FormattedDailyWeather[] = [];

  daysArray.forEach((dayEntries) => {
    if (!dayEntries || dayEntries.length === 0) return;
    const firstEntry = dayEntries[0];
    const dateKey = firstEntry.local_datetime.split(' ')[0] || firstEntry.datetime;
    const dateLabel = formatIndonesianDate(
      firstEntry.local_datetime || firstEntry.datetime,
    );

    result.push({
      dateKey,
      dateLabel,
      entries: dayEntries,
    });
  });

  return result;
};

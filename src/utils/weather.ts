import { CARD } from '@/constants';
import { BmkgWeatherEntry, BmkgWeatherResponse } from '@/types';

export interface FormattedDailyWeather {
  dateLabel: string;
  dateKey: string;
  entries: BmkgWeatherEntry[];
}

/**
 * format string "yyyy-mm-dd hh:mm:ss" or iso string to readable indonesian date
 * example: "selasa, 13 oktober 2026"
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
 * extracts "hh:mm" from "yyyy-mm-dd hh:mm:ss"
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
 * determine if a given local_datetime or time is during day (06:00 - 17:59)
 */
export const isDaytime = (dateTimeStr: string): boolean => {
  const time = formatTimeOnly(dateTimeStr);
  const hour = parseInt(time.split(':')[0], 10);
  return hour >= 6 && hour < 18;
};

/**
 * translate cardinal wind direction (e.g. "nw") to indonesian ("barat laut")
 */
export const getWindDirectionName = (cardinal: string): string => {
  if (!cardinal) return 'N/A';
  return CARD[cardinal as keyof typeof CARD] || cardinal;
};

/**
 * groups and formats the raw bmkg weather response by day
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

/**
 * converts iana timezone string to standard indonesian timezone abbreviation
 * - "asia/jakarta" -> "WIB"
 * - "asia/makassar" -> "WITA"
 * - "asia/jayapura" -> "WIT"
 */
export const getTimezoneAbbr = (timezone?: string): string => {
  if (!timezone) return 'WIB';
  const tz = timezone.toLowerCase();
  if (tz.includes('makassar') || tz.includes('wita')) {
    return 'WITA';
  }
  if (tz.includes('jayapura') || tz.includes('wit')) {
    return 'WIT';
  }
  if (tz.includes('jakarta') || tz.includes('wib')) {
    return 'WIB';
  }
  return 'WIB';
};

/**
 * formats earthquake time string ensuring proper timezone suffix without duplication
 * example: "17:22:02 WIB" -> "17:22:02 WIB"
 */
export const formatEarthquakeTime = (jamStr: string): string => {
  if (!jamStr) return '';
  // return as is if timezone abbreviation already exists
  if (/WI[BT|A]?/i.test(jamStr)) {
    return jamStr;
  }
  return `${jamStr} WIB`;
};

/**
 * parses and normalizes earthquake coordinates from BMKG feeds
 * handles comma-delimited strings as well as degree notation (LS/LU, BT/BB)
 * returns [latitude, longitude] or null if invalid
 */
export const parseEarthquakeCoordinates = (
  coordinates?: string[],
  lintang?: string,
  bujur?: string,
): [number, number] | null => {
  if (coordinates && coordinates.length >= 2) {
    const lat = parseFloat(coordinates[0]);
    const lon = parseFloat(coordinates[1]);
    if (!isNaN(lat) && !isNaN(lon)) {
      return [lat, lon];
    }
  }

  if (lintang && bujur) {
    const cleanLatStr = lintang.replace(/[^\d.-]/g, '');
    const cleanLonStr = bujur.replace(/[^\d.-]/g, '');
    const latVal = parseFloat(cleanLatStr);
    const lonVal = parseFloat(cleanLonStr);

    if (!isNaN(latVal) && !isNaN(lonVal)) {
      // LS (Lintang Selatan) / S is negative; LU (Lintang Utara) / U is positive
      const lat = /LS|S/i.test(lintang) ? -Math.abs(latVal) : latVal;
      // BB (Bujur Barat) / W is negative; BT (Bujur Timur) / E is positive
      const lon = /BB|W/i.test(bujur) ? -Math.abs(lonVal) : lonVal;
      return [lat, lon];
    }
  }

  return null;
};

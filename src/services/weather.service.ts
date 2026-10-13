import { DEFAULT_ADM4 } from '@/constants';
import { BmkgWeatherResponse } from '@/types';

// fetch weather forecast for a given region (adm4 code) from bmkg rest json api
export const fetchWeather = async (
  adm4: string = DEFAULT_ADM4,
): Promise<BmkgWeatherResponse | null> => {
  const url = `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${encodeURIComponent(adm4)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data: BmkgWeatherResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data from BMKG REST API:', error);
    return null;
  }
};

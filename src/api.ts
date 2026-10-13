import { DEFAULT_ADM4 } from './constant';
import { BmkgWeatherResponse, EarthquakeData, NewestEarthquake } from './interface';

const parseEarthquakeData = (xmlDoc: XMLDocument) => {
  const gempaElements = Array.from(xmlDoc.getElementsByTagName('gempa'));
  return gempaElements.map((gempa) => {
    const tanggal = gempa.getElementsByTagName('Tanggal')[0].textContent || '';
    const jam = gempa.getElementsByTagName('Jam')[0].textContent || '';
    const coordinates =
      gempa.getElementsByTagName('coordinates')[0].textContent?.split(',') || [];
    const lintang = gempa.getElementsByTagName('Lintang')[0].textContent || '';
    const bujur = gempa.getElementsByTagName('Bujur')[0].textContent || '';
    const magnitude = gempa.getElementsByTagName('Magnitude')[0].textContent || '';
    const kedalaman = gempa.getElementsByTagName('Kedalaman')[0].textContent || '';
    const wilayah = gempa.getElementsByTagName('Wilayah')[0].textContent || '';
    const potensi = gempa.getElementsByTagName('Potensi')[0]?.textContent || '';
    const dirasakan = gempa.getElementsByTagName('Dirasakan')[0]?.textContent || '';

    return {
      tanggal,
      jam,
      coordinates,
      lintang,
      bujur,
      magnitude,
      kedalaman,
      wilayah,
      potensi,
      dirasakan,
    };
  });
};

export const fetchNewestEarthquake = async (): Promise<NewestEarthquake | null> => {
  const url = 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.xml';
  try {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'application/xml');

    const gempa = xmlDoc.getElementsByTagName('gempa')[0];

    const tanggal = gempa.getElementsByTagName('Tanggal')[0].textContent || '';
    const jam = gempa.getElementsByTagName('Jam')[0].textContent || '';
    const lintang = gempa.getElementsByTagName('Lintang')[0].textContent || '';
    const bujur = gempa.getElementsByTagName('Bujur')[0].textContent || '';
    const magnitude = gempa.getElementsByTagName('Magnitude')[0].textContent || '';
    const kedalaman = gempa.getElementsByTagName('Kedalaman')[0].textContent || '';
    const wilayah = gempa.getElementsByTagName('Wilayah')[0].textContent || '';
    const potensi = gempa.getElementsByTagName('Potensi')[0].textContent || '';
    const dirasakan = gempa.getElementsByTagName('Dirasakan')[0].textContent || '';
    const shakemap = gempa.getElementsByTagName('Shakemap')[0].textContent || '';

    return {
      tanggal,
      jam,
      lintang,
      bujur,
      magnitude,
      kedalaman,
      wilayah,
      potensi,
      dirasakan,
      shakemap,
    };
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    return null;
  }
};

export const fetchEarthquake5Min = async (): Promise<EarthquakeData[] | null> => {
  const url = 'https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.xml';
  try {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'application/xml');
    return parseEarthquakeData(xmlDoc);
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    return null;
  }
};

export const fetchEarthquakeFelt = async (): Promise<EarthquakeData[] | null> => {
  const url = 'https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.xml';
  try {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'application/xml');
    return parseEarthquakeData(xmlDoc);
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    return null;
  }
};

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

import { EarthquakeData, NewestEarthquake } from '@/types';
import { parseEarthquakeCoordinates } from '@/utils';

// parse xml response from bmkg earthquake endpoint
const parseEarthquakeData = (xmlDoc: XMLDocument): EarthquakeData[] => {
  const gempaElements = Array.from(xmlDoc.getElementsByTagName('gempa'));
  return gempaElements.map((gempa) => {
    const tanggal = gempa.getElementsByTagName('Tanggal')[0]?.textContent || '';
    const jam = gempa.getElementsByTagName('Jam')[0]?.textContent || '';
    const rawCoordinates =
      gempa.getElementsByTagName('Coordinates')[0]?.textContent ||
      gempa.getElementsByTagName('coordinates')[0]?.textContent ||
      '';
    let coordinates = rawCoordinates ? rawCoordinates.split(',') : [];
    const lintang = gempa.getElementsByTagName('Lintang')[0]?.textContent || '';
    const bujur = gempa.getElementsByTagName('Bujur')[0]?.textContent || '';
    const magnitude = gempa.getElementsByTagName('Magnitude')[0]?.textContent || '';
    const kedalaman = gempa.getElementsByTagName('Kedalaman')[0]?.textContent || '';
    const wilayah = gempa.getElementsByTagName('Wilayah')[0]?.textContent || '';
    const potensi = gempa.getElementsByTagName('Potensi')[0]?.textContent || '';
    const dirasakan = gempa.getElementsByTagName('Dirasakan')[0]?.textContent || '';

    // fallback: if coordinates array is empty, resolve from lintang and bujur
    if (coordinates.length < 2 && lintang && bujur) {
      const parsed = parseEarthquakeCoordinates(undefined, lintang, bujur);
      if (parsed) {
        coordinates = [String(parsed[0]), String(parsed[1])];
      }
    }

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

// fetch the latest single earthquake event
export const fetchNewestEarthquake = async (
  signal?: AbortSignal,
): Promise<NewestEarthquake | null> => {
  const url = 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.xml';
  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'application/xml');

    const gempa = xmlDoc.getElementsByTagName('gempa')[0];
    if (!gempa) {
      return null;
    }

    const tanggal = gempa.getElementsByTagName('Tanggal')[0]?.textContent || '';
    const jam = gempa.getElementsByTagName('Jam')[0]?.textContent || '';
    const lintang = gempa.getElementsByTagName('Lintang')[0]?.textContent || '';
    const bujur = gempa.getElementsByTagName('Bujur')[0]?.textContent || '';
    const magnitude = gempa.getElementsByTagName('Magnitude')[0]?.textContent || '';
    const kedalaman = gempa.getElementsByTagName('Kedalaman')[0]?.textContent || '';
    const wilayah = gempa.getElementsByTagName('Wilayah')[0]?.textContent || '';
    const potensi = gempa.getElementsByTagName('Potensi')[0]?.textContent || '';
    const dirasakan = gempa.getElementsByTagName('Dirasakan')[0]?.textContent || '';
    const shakemap = gempa.getElementsByTagName('Shakemap')[0]?.textContent || '';
    const rawCoordinates =
      gempa.getElementsByTagName('Coordinates')[0]?.textContent ||
      gempa.getElementsByTagName('coordinates')[0]?.textContent ||
      '';
    let coordinates = rawCoordinates ? rawCoordinates.split(',') : [];

    // fallback: if coordinates array is empty, resolve from lintang and bujur
    if (coordinates.length < 2 && lintang && bujur) {
      const parsed = parseEarthquakeCoordinates(undefined, lintang, bujur);
      if (parsed) {
        coordinates = [String(parsed[0]), String(parsed[1])];
      }
    }

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
      coordinates,
    };
  } catch (error) {
    if ((error as Error)?.name === 'AbortError') {
      return null;
    }
    console.error('Error fetching newest earthquake data:', error);
    return null;
  }
};

// fetch the last 15 earthquakes with magnitude 5.0+
export const fetchEarthquake5Min = async (
  signal?: AbortSignal,
): Promise<EarthquakeData[] | null> => {
  const url = 'https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.xml';
  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'application/xml');
    return parseEarthquakeData(xmlDoc);
  } catch (error) {
    if ((error as Error)?.name === 'AbortError') {
      return null;
    }
    console.error('Error fetching 5.0+ earthquake data:', error);
    return null;
  }
};

// fetch the last 15 felt earthquakes
export const fetchEarthquakeFelt = async (
  signal?: AbortSignal,
): Promise<EarthquakeData[] | null> => {
  const url = 'https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.xml';
  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'application/xml');
    return parseEarthquakeData(xmlDoc);
  } catch (error) {
    if ((error as Error)?.name === 'AbortError') {
      return null;
    }
    console.error('Error fetching felt earthquake data:', error);
    return null;
  }
};

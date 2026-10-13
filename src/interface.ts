export interface NewestEarthquake {
  tanggal: string;
  jam: string;
  lintang: string;
  bujur: string;
  magnitude: string;
  kedalaman: string;
  wilayah: string;
  potensi: string;
  dirasakan: string;
  shakemap: string;
  coordinates?: string[];
}

export interface EarthquakeData {
  tanggal: string;
  jam: string;
  coordinates: string[];
  lintang: string;
  bujur: string;
  magnitude: string;
  kedalaman: string;
  wilayah: string;
  potensi?: string;
  dirasakan?: string;
}

// new bmkg weather rest json interfaces
export interface BmkgWeatherLocation {
  adm1: string;
  adm2: string;
  adm3: string;
  adm4: string;
  provinsi: string;
  kotkab: string;
  kecamatan: string;
  desa: string;
  lon: number;
  lat: number;
  timezone: string;
  type?: string;
}

export interface BmkgWeatherEntry {
  datetime: string;
  local_datetime: string;
  t: number;
  tcc: number;
  tp: number;
  weather: number;
  weather_desc: string;
  weather_desc_en: string;
  wd_deg?: number;
  wd: string;
  wd_to?: string;
  ws: number;
  hu: number;
  vs?: number | null;
  vs_text?: string | null;
  time_index?: string;
  analysis_date?: string;
  image: string;
  utc_datetime: string;
}

export interface BmkgWeatherDataItem {
  lokasi: BmkgWeatherLocation;
  cuaca: BmkgWeatherEntry[][];
}

export interface BmkgWeatherResponse {
  lokasi: BmkgWeatherLocation;
  data: BmkgWeatherDataItem[];
}

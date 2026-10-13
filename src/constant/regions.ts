export interface RegionCity {
  name: string;
  adm4: string;
}

export interface RegionProvince {
  name: string;
  cities: RegionCity[];
}

export const REGIONS: Record<string, RegionProvince> = {
  DKIJakarta: {
    name: 'DKI Jakarta',
    cities: [
      { name: 'Kota Jakarta Pusat', adm4: '31.71.03.1001' },
      { name: 'Kota Jakarta Selatan', adm4: '31.74.01.1001' },
      { name: 'Kota Jakarta Barat', adm4: '31.73.01.1001' },
      { name: 'Kota Jakarta Timur', adm4: '31.75.01.1001' },
      { name: 'Kota Jakarta Utara', adm4: '31.72.01.1001' },
      { name: 'Kepulauan Seribu', adm4: '31.01.01.1001' },
    ],
  },
  JawaBarat: {
    name: 'Jawa Barat',
    cities: [
      { name: 'Kota Bandung', adm4: '32.04.05.2001' },
      { name: 'Kota Bogor', adm4: '32.01.01.1001' },
      { name: 'Kota Bekasi', adm4: '32.16.01.1007' },
      { name: 'Kota Depok', adm4: '32.76.01.1006' },
      { name: 'Kota Cimahi', adm4: '32.77.01.1001' },
      { name: 'Kota Cirebon', adm4: '32.09.01.2008' },
      { name: 'Kota Tasikmalaya', adm4: '32.06.01.2001' },
      { name: 'Kota Sukabumi', adm4: '32.02.01.1001' },
      { name: 'Kota Banjar', adm4: '32.79.01.1001' },
      { name: 'Kab. Bandung', adm4: '32.04.05.2001' },
      { name: 'Kab. Bogor', adm4: '32.01.01.1001' },
      { name: 'Kab. Bekasi', adm4: '32.16.01.1007' },
      { name: 'Kab. Cirebon', adm4: '32.09.01.2008' },
      { name: 'Kab. Garut', adm4: '32.05.01.1001' },
      { name: 'Kab. Karawang', adm4: '32.15.01.1001' },
    ],
  },
  JawaTengah: {
    name: 'Jawa Tengah',
    cities: [
      { name: 'Kota Semarang', adm4: '33.22.01.2001' },
      { name: 'Kota Surakarta (Solo)', adm4: '33.72.01.1001' },
      { name: 'Kota Magelang', adm4: '33.08.01.2001' },
      { name: 'Kota Pekalongan', adm4: '33.26.01.2001' },
      { name: 'Kota Salatiga', adm4: '33.73.01.1001' },
      { name: 'Kota Tegal', adm4: '33.28.01.2001' },
      { name: 'Kab. Banyumas (Purwokerto)', adm4: '33.02.01.2001' },
      { name: 'Kab. Cilacap', adm4: '33.01.01.2001' },
      { name: 'Kab. Kudus', adm4: '33.19.01.2001' },
      { name: 'Kab. Jepara', adm4: '33.20.01.2001' },
    ],
  },
  DIYogyakarta: {
    name: 'DI Yogyakarta',
    cities: [
      { name: 'Kota Yogyakarta', adm4: '34.71.01.1001' },
      { name: 'Kab. Sleman', adm4: '34.04.01.2001' },
      { name: 'Kab. Bantul', adm4: '34.02.01.2001' },
      { name: 'Kab. Gunungkidul', adm4: '34.03.01.2001' },
      { name: 'Kab. Kulon Progo', adm4: '34.01.01.2001' },
    ],
  },
  JawaTimur: {
    name: 'Jawa Timur',
    cities: [
      { name: 'Kota Surabaya', adm4: '35.78.01.1001' },
      { name: 'Kota Malang', adm4: '35.07.01.2001' },
      { name: 'Kota Batu', adm4: '35.79.01.1001' },
      { name: 'Kota Kediri', adm4: '35.06.01.2001' },
      { name: 'Kota Blitar', adm4: '35.05.01.2001' },
      { name: 'Kota Madiun', adm4: '35.19.01.2001' },
      { name: 'Kota Mojokerto', adm4: '35.16.01.2001' },
      { name: 'Kota Pasuruan', adm4: '35.14.01.2001' },
      { name: 'Kota Probolinggo', adm4: '35.13.01.2001' },
      { name: 'Kab. Sidoarjo', adm4: '35.15.01.2001' },
      { name: 'Kab. Banyuwangi', adm4: '35.10.01.2001' },
      { name: 'Kab. Jember', adm4: '35.09.01.2001' },
    ],
  },
  Banten: {
    name: 'Banten',
    cities: [
      { name: 'Kota Serang', adm4: '36.04.05.2001' },
      { name: 'Kota Tangerang', adm4: '36.03.01.1001' },
      { name: 'Kota Tangerang Selatan', adm4: '36.74.01.1001' },
      { name: 'Kota Cilegon', adm4: '36.72.01.1001' },
      { name: 'Kab. Lebak', adm4: '36.02.01.2002' },
      { name: 'Kab. Pandeglang', adm4: '36.01.01.2001' },
    ],
  },
  Bali: {
    name: 'Bali',
    cities: [
      { name: 'Kota Denpasar', adm4: '51.71.01.1001' },
      { name: 'Kab. Badung', adm4: '51.03.01.1001' },
      { name: 'Kab. Gianyar', adm4: '51.04.01.2001' },
      { name: 'Kab. Buleleng', adm4: '51.08.01.2001' },
      { name: 'Kab. Tabanan', adm4: '51.02.01.2001' },
    ],
  },
  NusaTenggaraBarat: {
    name: 'Nusa Tenggara Barat',
    cities: [
      { name: 'Kota Mataram', adm4: '52.71.01.1004' },
      { name: 'Kota Bima', adm4: '52.06.01.2005' },
      { name: 'Kab. Lombok Barat', adm4: '52.01.01.1001' },
      { name: 'Kab. Lombok Tengah', adm4: '52.02.01.1001' },
      { name: 'Kab. Sumbawa', adm4: '52.04.02.2001' },
    ],
  },
  NusaTenggaraTimur: {
    name: 'Nusa Tenggara Timur',
    cities: [
      { name: 'Kota Kupang', adm4: '53.01.04.2003' },
      { name: 'Kab. Manggarai Barat (Labuan Bajo)', adm4: '53.15.01.2001' },
      { name: 'Kab. Sikka (Maumere)', adm4: '53.07.01.2001' },
      { name: 'Kab. Ende', adm4: '53.08.01.1001' },
    ],
  },
  Aceh: {
    name: 'Aceh',
    cities: [
      { name: 'Kota Banda Aceh', adm4: '11.71.01.2001' },
      { name: 'Kota Sabang', adm4: '11.72.01.2004' },
      { name: 'Kota Lhokseumawe', adm4: '11.73.01.2002' },
      { name: 'Kota Langsa', adm4: '11.74.01.2007' },
    ],
  },
  SumateraUtara: {
    name: 'Sumatera Utara',
    cities: [
      { name: 'Kota Medan', adm4: '12.71.01.1001' },
      { name: 'Kota Pematangsiantar', adm4: '12.72.01.1001' },
      { name: 'Kota Binjai', adm4: '12.75.01.1001' },
      { name: 'Kota Tebing Tinggi', adm4: '12.76.01.1001' },
      { name: 'Kota Padang Sidempuan', adm4: '13.71.01.1001' },
    ],
  },
  SumateraBarat: {
    name: 'Sumatera Barat',
    cities: [
      { name: 'Kota Padang', adm4: '13.71.01.1001' },
      { name: 'Kota Bukittinggi', adm4: '13.75.01.1001' },
      { name: 'Kota Payakumbuh', adm4: '13.76.01.1002' },
      { name: 'Kota Pariaman', adm4: '13.77.01.1001' },
      { name: 'Kota Solok', adm4: '13.02.03.2001' },
    ],
  },
  Riau: {
    name: 'Riau',
    cities: [
      { name: 'Kota Pekanbaru', adm4: '14.71.01.1002' },
      { name: 'Kota Dumai', adm4: '14.72.01.1003' },
      { name: 'Kab. Kampar', adm4: '14.01.01.1011' },
      { name: 'Kab. Bengkalis', adm4: '14.03.01.1001' },
    ],
  },
  KepulauanRiau: {
    name: 'Kepulauan Riau',
    cities: [
      { name: 'Kota Batam', adm4: '21.71.01.1002' },
      { name: 'Kota Tanjungpinang', adm4: '21.72.01.1001' },
      { name: 'Kab. Bintan', adm4: '21.01.04.1005' },
      { name: 'Kab. Karimun', adm4: '21.02.01.1003' },
    ],
  },
  Jambi: {
    name: 'Jambi',
    cities: [
      { name: 'Kota Jambi', adm4: '15.71.01.1001' },
      { name: 'Kota Sungai Penuh', adm4: '15.72.01.1001' },
      { name: 'Kab. Muaro Jambi', adm4: '15.05.01.1003' },
    ],
  },
  SumateraSelatan: {
    name: 'Sumatera Selatan',
    cities: [
      { name: 'Kota Palembang', adm4: '16.71.01.1001' },
      { name: 'Kota Prabumulih', adm4: '16.74.01.1001' },
      { name: 'Kota Lubuklinggau', adm4: '16.73.01.1001' },
      { name: 'Kota Pagar Alam', adm4: '16.72.01.1001' },
    ],
  },
  BangkaBelitung: {
    name: 'Bangka Belitung',
    cities: [
      { name: 'Kota Pangkalpinang', adm4: '19.71.01.1004' },
      { name: 'Kab. Bangka', adm4: '19.01.01.1001' },
      { name: 'Kab. Belitung', adm4: '19.02.01.1001' },
    ],
  },
  Bengkulu: {
    name: 'Bengkulu',
    cities: [
      { name: 'Kota Bengkulu', adm4: '17.71.01.1001' },
      { name: 'Kab. Rejang Lebong', adm4: '17.02.06.1004' },
    ],
  },
  Lampung: {
    name: 'Lampung',
    cities: [
      { name: 'Kota Bandar Lampung', adm4: '18.71.01.1003' },
      { name: 'Kota Metro', adm4: '18.72.01.1001' },
      { name: 'Kab. Lampung Selatan', adm4: '18.01.04.2001' },
    ],
  },
  KalimantanBarat: {
    name: 'Kalimantan Barat',
    cities: [
      { name: 'Kota Pontianak', adm4: '61.71.01.1002' },
      { name: 'Kota Singkawang', adm4: '61.72.01.1001' },
      { name: 'Kab. Kubu Raya', adm4: '61.12.01.2001' },
    ],
  },
  KalimantanTengah: {
    name: 'Kalimantan Tengah',
    cities: [
      { name: 'Kota Palangka Raya', adm4: '62.71.01.1001' },
      { name: 'Kab. Kotawaringin Timur', adm4: '62.02.01.1009' },
    ],
  },
  KalimantanSelatan: {
    name: 'Kalimantan Selatan',
    cities: [
      { name: 'Kota Banjarmasin', adm4: '63.71.01.1001' },
      { name: 'Kota Banjarbaru', adm4: '63.72.02.1003' },
      { name: 'Kab. Banjar', adm4: '32.79.01.1001' },
    ],
  },
  KalimantanTimur: {
    name: 'Kalimantan Timur',
    cities: [
      { name: 'Kota Samarinda', adm4: '64.72.01.1001' },
      { name: 'Kota Balikpapan', adm4: '64.71.01.1001' },
      { name: 'Kota Bontang', adm4: '64.74.01.1001' },
      { name: 'Kab. Kutai Kartanegara', adm4: '64.02.01.2001' },
    ],
  },
  KalimantanUtara: {
    name: 'Kalimantan Utara',
    cities: [
      { name: 'Kota Tarakan', adm4: '65.71.01.1001' },
      { name: 'Kab. Bulungan', adm4: '65.01.01.1001' },
    ],
  },
  SulawesiUtara: {
    name: 'Sulawesi Utara',
    cities: [
      { name: 'Kota Manado', adm4: '71.71.01.1001' },
      { name: 'Kota Bitung', adm4: '71.72.01.1001' },
      { name: 'Kota Tomohon', adm4: '71.73.01.1001' },
      { name: 'Kota Kotamobagu', adm4: '71.74.01.1005' },
    ],
  },
  Gorontalo: {
    name: 'Gorontalo',
    cities: [
      { name: 'Kota Gorontalo', adm4: '75.01.01.1001' },
      { name: 'Kab. Bone Bolango', adm4: '75.03.01.2004' },
    ],
  },
  SulawesiTengah: {
    name: 'Sulawesi Tengah',
    cities: [
      { name: 'Kota Palu', adm4: '72.71.01.1004' },
      { name: 'Kab. Donggala', adm4: '72.03.04.2001' },
    ],
  },
  SulawesiBarat: {
    name: 'Sulawesi Barat',
    cities: [
      { name: 'Kab. Mamuju', adm4: '76.02.01.1002' },
      { name: 'Kab. Polewali Mandar', adm4: '76.04.01.1001' },
    ],
  },
  SulawesiSelatan: {
    name: 'Sulawesi Selatan',
    cities: [
      { name: 'Kota Makassar', adm4: '73.71.01.1001' },
      { name: 'Kota Parepare', adm4: '73.72.01.1004' },
      { name: 'Kota Palopo', adm4: '73.73.01.1001' },
      { name: 'Kab. Gowa', adm4: '73.06.01.1001' },
    ],
  },
  SulawesiTenggara: {
    name: 'Sulawesi Tenggara',
    cities: [
      { name: 'Kota Kendari', adm4: '74.71.01.1005' },
      { name: 'Kota Baubau', adm4: '74.72.01.1007' },
    ],
  },
  Maluku: {
    name: 'Maluku',
    cities: [
      { name: 'Kota Ambon', adm4: '81.71.01.1006' },
      { name: 'Kota Tual', adm4: '81.72.01.2001' },
    ],
  },
  MalukuUtara: {
    name: 'Maluku Utara',
    cities: [
      { name: 'Kota Ternate', adm4: '82.71.01.1001' },
      { name: 'Kota Tidore Kepulauan', adm4: '82.72.01.1001' },
    ],
  },
  Papua: {
    name: 'Papua',
    cities: [
      { name: 'Kota Jayapura', adm4: '91.03.01.1001' },
      { name: 'Kab. Jayapura', adm4: '91.03.01.1001' },
    ],
  },
  PapuaBarat: {
    name: 'Papua Barat',
    cities: [
      { name: 'Kab. Manokwari', adm4: '92.02.03.2001' },
      { name: 'Kab. Fakfak', adm4: '92.03.01.1001' },
    ],
  },
  PapuaBaratDaya: {
    name: 'Papua Barat Daya',
    cities: [{ name: 'Kota Sorong', adm4: '96.01.01.1001' }],
  },
  PapuaSelatan: {
    name: 'Papua Selatan',
    cities: [{ name: 'Kab. Merauke', adm4: '93.01.01.1002' }],
  },
  PapuaTengah: {
    name: 'Papua Tengah',
    cities: [{ name: 'Kab. Nabire', adm4: '94.01.01.1001' }],
  },
  PapuaPegunungan: {
    name: 'Papua Pegunungan',
    cities: [{ name: 'Kab. Jayawijaya', adm4: '95.01.01.1001' }],
  },
};

export const DEFAULT_ADM4 = '31.71.03.1001'; // Jakarta Pusat
export const DEFAULT_PROVINCE_KEY = 'DKIJakarta';

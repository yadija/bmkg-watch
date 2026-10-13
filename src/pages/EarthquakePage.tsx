import { useEffect, useRef, useState } from 'react';

import { fetchEarthquake5Min, fetchEarthquakeFelt, fetchNewestEarthquake } from '../api';
import EarthquakeDetail from '../components/earthquake/EarthquakeDetail';
import EarthquakeList from '../components/earthquake/EarthquakeList';
import EarthquakeMap from '../components/earthquake/EarthquakeMap';
import { EarthquakeData, NewestEarthquake } from '../interface';

export default function EarthquakePage() {
  const [newestEarthquake, setNewestEarthquake] = useState<NewestEarthquake | null>(null);
  const [earthquake5Min, setEarthquake5Min] = useState<EarthquakeData[] | null>(null);
  const [earthquakeFelt, setEarthquakeFelt] = useState<EarthquakeData[] | null>(null);
  const [selectedCoord, setSelectedCoord] = useState<[number, number] | null>(null);

  const mapSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const newest = await fetchNewestEarthquake();
      setNewestEarthquake(newest);

      const eq5Min = await fetchEarthquake5Min();
      setEarthquake5Min(eq5Min);

      const eqFelt = await fetchEarthquakeFelt();
      setEarthquakeFelt(eqFelt);
    };

    fetchData();
  }, []);

  const handleSelectEarthquake = (coord: [number, number]) => {
    setSelectedCoord(coord);
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className='min-h-[calc(100vh-160px)] py-2'>
      {/* Detail Gempa Terbaru */}
      <EarthquakeDetail earthquake={newestEarthquake} />

      {/* Peta Interaktif Terpadu (Single Map for All Earthquakes) */}
      <div ref={mapSectionRef}>
        <EarthquakeMap
          newestEarthquake={newestEarthquake}
          earthquakes5Min={earthquake5Min}
          earthquakesFelt={earthquakeFelt}
          selectedCoord={selectedCoord}
        />
      </div>

      {/* Daftar Gempa */}
      <section className='flex flex-col justify-between gap-6 lg:flex-row'>
        <div className='flex-1'>
          <EarthquakeList
            title='15 Gempabumi M 5,0+'
            earthquakes={earthquake5Min}
            onSelectEarthquake={handleSelectEarthquake}
          />
        </div>
        <div className='flex-1'>
          <EarthquakeList
            title='15 Gempabumi Dirasakan'
            earthquakes={earthquakeFelt}
            onSelectEarthquake={handleSelectEarthquake}
          />
        </div>
      </section>
    </section>
  );
}

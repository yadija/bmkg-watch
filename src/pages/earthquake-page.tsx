import { useEffect, useRef, useState } from 'react';

import EarthquakeDetail from '@/components/earthquake/earthquake-detail';
import EarthquakeList from '@/components/earthquake/earthquake-list';
import EarthquakeMap from '@/components/earthquake/earthquake-map';
import {
  fetchEarthquake5Min,
  fetchEarthquakeFelt,
  fetchNewestEarthquake,
} from '@/services';
import { EarthquakeData, NewestEarthquake } from '@/types';

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
      {/* latest earthquake details */}
      <EarthquakeDetail earthquake={newestEarthquake} />

      {/* unified interactive map for all earthquakes */}
      <section ref={mapSectionRef}>
        <EarthquakeMap
          newestEarthquake={newestEarthquake}
          earthquakes5Min={earthquake5Min}
          earthquakesFelt={earthquakeFelt}
          selectedCoord={selectedCoord}
        />
      </section>

      {/* earthquake lists */}
      <section className='flex flex-col justify-between gap-6 lg:flex-row'>
        <section className='flex-1'>
          <EarthquakeList
            title='15 Gempabumi M 5,0+'
            earthquakes={earthquake5Min}
            onSelectEarthquake={handleSelectEarthquake}
          />
        </section>
        <section className='flex-1'>
          <EarthquakeList
            title='15 Gempabumi Dirasakan'
            earthquakes={earthquakeFelt}
            onSelectEarthquake={handleSelectEarthquake}
          />
        </section>
      </section>
    </section>
  );
}

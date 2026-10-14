import { useEffect, useRef, useState } from 'react';
import { LuExternalLink } from 'react-icons/lu';

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
    <section className='min-h-[calc(100vh-160px)] py-4'>
      {/* page header notice banner - uniform border, flat accent tag */}
      <header className='mb-6 border border-gray-300 bg-white p-4 shadow-none dark:border-zinc-800 dark:bg-zinc-900'>
        <section className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <section className='flex items-center gap-3'>
            <span className='inline-flex shrink-0 items-center border border-red-600 bg-red-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white'>
              Seismik BMKG
            </span>
            <section>
              <h1 className='text-base font-bold text-gray-900 dark:text-zinc-100'>
                Pusat Informasi Gempabumi Indonesia
              </h1>
              <p className='mt-0.5 text-xs text-gray-700 dark:text-zinc-300'>
                Pemantauan data seismik real-time bersumber dari Indonesia Tsunami Early
                Warning System (InaTEWS) BMKG.
              </p>
            </section>
          </section>

          <a
            href='https://inatews.bmkg.go.id'
            target='_blank'
            rel='noreferrer'
            className='inline-flex shrink-0 items-center justify-center gap-1.5 self-start border border-gray-400 bg-gray-50 px-3 py-2 text-xs font-bold leading-none text-gray-900 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 sm:self-center'
          >
            <span className='leading-none'>Situs inatews.bmkg.go.id</span>
            <LuExternalLink size={14} className='shrink-0' />
          </a>
        </section>
      </header>

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

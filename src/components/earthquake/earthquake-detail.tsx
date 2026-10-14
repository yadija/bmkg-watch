import { Typography } from '@material-tailwind/react';
import {
  LuActivity,
  LuAlertTriangle,
  LuClock,
  LuLayers,
  LuMapPin,
  LuNavigation,
  LuRadio,
} from 'react-icons/lu';

import { NewestEarthquake } from '@/types';

import EarthquakeDetailSkeleton from './earthquake-detail-skeleton';
import ShakemapPreview from './shakemap-preview';

interface EarthquakeDetailProps {
  earthquake: NewestEarthquake | null;
}

export default function EarthquakeDetail({ earthquake }: EarthquakeDetailProps) {
  if (!earthquake) {
    return <EarthquakeDetailSkeleton />;
  }

  return (
    <>
      <section className='border border-gray-300 bg-white shadow-none dark:border-zinc-800 dark:bg-zinc-900'>
        {/* card header with flat accent tag */}
        <section className='flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/80'>
          <section className='flex items-center gap-3'>
            <span className='inline-flex shrink-0 items-center border border-red-600 bg-red-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white'>
              Gempa Terkini
            </span>
            <Typography
              variant='h1'
              className='text-base font-bold text-gray-900 dark:text-zinc-100'
            >
              Info Gempa Bumi Terbaru Indonesia
            </Typography>
          </section>
          <span className='border border-red-600 bg-red-600 px-3 py-1 text-sm font-bold tracking-wider text-white'>
            M {earthquake.magnitude}
          </span>
        </section>

        <section className='flex flex-col gap-6 p-4 lg:flex-row'>
          {/* metrics information column */}
          <section className='flex flex-1 flex-col gap-3'>
            {/* epicentrum card */}
            <section className='border border-gray-200 bg-gray-50 p-3.5 dark:border-zinc-800 dark:bg-zinc-950/60'>
              <section className='flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-zinc-300'>
                <LuMapPin size={15} className='text-red-600 dark:text-red-400' />
                <span>Pusat Episentrum</span>
              </section>
              <p className='mt-1 text-base font-bold text-gray-900 dark:text-zinc-100'>
                {earthquake.wilayah}
              </p>
            </section>

            {/* key parameters grid */}
            <section className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
              <section className='flex h-20 flex-col justify-between border border-gray-200 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-900'>
                <section className='flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-700 dark:text-zinc-400'>
                  <LuActivity size={13} className='text-red-600 dark:text-red-400' />
                  <span>Magnitudo</span>
                </section>
                <p className='text-xl font-bold text-red-600 dark:text-red-400'>
                  M {earthquake.magnitude}
                </p>
              </section>

              <section className='flex h-20 flex-col justify-between border border-gray-200 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-900'>
                <section className='flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-700 dark:text-zinc-400'>
                  <LuLayers size={13} className='text-blue-600 dark:text-blue-400' />
                  <span>Kedalaman</span>
                </section>
                <p className='text-base font-bold text-gray-900 dark:text-zinc-100'>
                  {earthquake.kedalaman}
                </p>
              </section>

              <section className='flex h-20 flex-col justify-between border border-gray-200 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-900'>
                <section className='flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-700 dark:text-zinc-400'>
                  <LuNavigation
                    size={13}
                    className='text-indigo-600 dark:text-indigo-400'
                  />
                  <span>Koordinat</span>
                </section>
                <p className='text-xs font-bold text-gray-900 dark:text-zinc-100'>
                  {earthquake.lintang}, {earthquake.bujur}
                </p>
              </section>

              <section className='flex h-20 flex-col justify-between border border-gray-200 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-900'>
                <section className='flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-700 dark:text-zinc-400'>
                  <LuClock size={13} className='text-gray-700 dark:text-zinc-400' />
                  <span>Waktu Gempa</span>
                </section>
                <p className='text-xs font-bold text-gray-900 dark:text-zinc-100'>
                  {earthquake.tanggal} &bull; {earthquake.jam}
                </p>
              </section>
            </section>

            {/* tsunami status */}
            {earthquake.potensi && (
              <section className='border border-amber-300 bg-amber-50 p-3 dark:border-amber-700/60 dark:bg-amber-950/40'>
                <section className='flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300'>
                  <LuAlertTriangle
                    size={14}
                    className='text-amber-800 dark:text-amber-400'
                  />
                  <span>Potensi Tsunami</span>
                </section>
                <p className='mt-1 text-xs font-bold text-amber-900 dark:text-amber-300'>
                  {earthquake.potensi}
                </p>
              </section>
            )}

            {/* mmi felt status */}
            {earthquake.dirasakan && (
              <section className='border border-blue-300 bg-blue-50 p-3 dark:border-blue-700/60 dark:bg-blue-950/40'>
                <section className='flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300'>
                  <LuRadio size={14} className='text-blue-800 dark:text-blue-400' />
                  <span>Dirasakan (Skala MMI)</span>
                </section>
                <p className='mt-1 text-xs font-bold text-blue-900 dark:text-blue-300'>
                  {earthquake.dirasakan}
                </p>
              </section>
            )}
          </section>

          {/* shakemap image preview */}
          <ShakemapPreview
            shakemap={earthquake.shakemap}
            className='w-full shrink-0 lg:w-80'
          />
        </section>
      </section>
    </>
  );
}

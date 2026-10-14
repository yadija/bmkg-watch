import { Card, CardBody, Dialog, Typography } from '@material-tailwind/react';
import { useState } from 'react';
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

interface EarthquakeDetailProps {
  earthquake: NewestEarthquake | null;
}

export default function EarthquakeDetail({ earthquake }: EarthquakeDetailProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prev) => !prev);

  if (!earthquake) {
    return <EarthquakeDetailSkeleton />;
  }

  return (
    <>
      <Card className='rounded-none border border-gray-300 bg-white shadow-none'>
        {/* card header with flat accent tag */}
        <section className='flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50/70 p-4'>
          <section className='flex items-center gap-3'>
            <span className='inline-flex shrink-0 items-center border border-red-600 bg-red-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white'>
              Gempa Terkini
            </span>
            <Typography variant='h1' className='text-base font-bold text-gray-900'>
              Info Gempa Bumi Terbaru Indonesia
            </Typography>
          </section>
          <span className='border border-red-600 bg-red-600 px-3 py-1 text-sm font-bold tracking-wider text-white'>
            M {earthquake.magnitude}
          </span>
        </section>

        <CardBody className='flex flex-col gap-6 p-4 lg:flex-row'>
          {/* metrics information column */}
          <section className='flex flex-1 flex-col gap-3'>
            {/* epicentrum card */}
            <section className='border border-gray-200 bg-gray-50 p-3.5'>
              <section className='flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-700'>
                <LuMapPin size={15} className='text-red-600' />
                <span>Pusat Episentrum</span>
              </section>
              <p className='mt-1 text-base font-bold text-gray-900'>
                {earthquake.wilayah}
              </p>
            </section>

            {/* key parameters grid */}
            <section className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
              <section className='flex h-20 flex-col justify-between border border-gray-200 bg-white p-2.5'>
                <section className='flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-700'>
                  <LuActivity size={13} className='text-red-600' />
                  <span>Magnitudo</span>
                </section>
                <p className='text-xl font-bold text-red-600'>M {earthquake.magnitude}</p>
              </section>

              <section className='flex h-20 flex-col justify-between border border-gray-200 bg-white p-2.5'>
                <section className='flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-700'>
                  <LuLayers size={13} className='text-blue-600' />
                  <span>Kedalaman</span>
                </section>
                <p className='text-base font-bold text-gray-900'>
                  {earthquake.kedalaman}
                </p>
              </section>

              <section className='flex h-20 flex-col justify-between border border-gray-200 bg-white p-2.5'>
                <section className='flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-700'>
                  <LuNavigation size={13} className='text-indigo-600' />
                  <span>Koordinat</span>
                </section>
                <p className='text-xs font-bold text-gray-900'>
                  {earthquake.lintang}, {earthquake.bujur}
                </p>
              </section>

              <section className='flex h-20 flex-col justify-between border border-gray-200 bg-white p-2.5'>
                <section className='flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-700'>
                  <LuClock size={13} className='text-gray-700' />
                  <span>Waktu Gempa</span>
                </section>
                <p className='text-xs font-bold text-gray-900'>
                  {earthquake.tanggal} &bull; {earthquake.jam}
                </p>
              </section>
            </section>

            {/* tsunami status */}
            {earthquake.potensi && (
              <section className='border border-amber-300 bg-amber-50 p-3'>
                <section className='flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900'>
                  <LuAlertTriangle size={14} className='text-amber-800' />
                  <span>Potensi Tsunami</span>
                </section>
                <p className='mt-1 text-xs font-bold text-amber-900'>
                  {earthquake.potensi}
                </p>
              </section>
            )}

            {/* mmi felt status */}
            {earthquake.dirasakan && (
              <section className='border border-blue-300 bg-blue-50 p-3'>
                <section className='flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-900'>
                  <LuRadio size={14} className='text-blue-800' />
                  <span>Dirasakan (Skala MMI)</span>
                </section>
                <p className='mt-1 text-xs font-bold text-blue-900'>
                  {earthquake.dirasakan}
                </p>
              </section>
            )}
          </section>

          {/* shakemap image preview */}
          <section className='w-full shrink-0 lg:w-80'>
            <button
              className='group relative block w-full border border-gray-300 bg-gray-100'
              onClick={handleOpen}
              title='Klik untuk memperbesar shakemap'
            >
              <img
                src={`https://data.bmkg.go.id/DataMKG/TEWS/${earthquake.shakemap}`}
                alt='Shakemap'
                className='h-auto w-full transition-opacity group-hover:opacity-90'
              />
            </button>
          </section>
        </CardBody>
      </Card>

      {/* modal dialog with flat square container */}
      <Dialog
        size='sm'
        open={open}
        handler={handleOpen}
        className='!rounded-none border border-gray-300 bg-white p-4 !shadow-none'
      >
        <section className='mb-3 flex items-center justify-between border-b border-gray-200 pb-2'>
          <section className='flex items-center gap-2'>
            <span className='border border-red-600 bg-red-600 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white'>
              Shakemap
            </span>
            <h3 className='text-xs font-bold uppercase tracking-wider text-gray-900'>
              Peta Guncangan Gempa BMKG
            </h3>
          </section>
          <button
            onClick={handleOpen}
            className='border border-gray-300 bg-gray-50 px-2.5 py-1 text-xs font-bold text-gray-800 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white'
          >
            Tutup &times;
          </button>
        </section>

        <img
          src={`https://data.bmkg.go.id/DataMKG/TEWS/${earthquake.shakemap}`}
          alt='Shakemap'
          className='h-auto w-full border border-gray-200 bg-gray-100'
        />
      </Dialog>
    </>
  );
}

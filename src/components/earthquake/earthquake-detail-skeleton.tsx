import { Card, CardBody } from '@material-tailwind/react';

export default function EarthquakeDetailSkeleton() {
  return (
    <Card className='animate-pulse rounded-none border border-gray-300 bg-white shadow-none'>
      <section className='flex items-center justify-between border-b border-gray-200 bg-gray-50/70 p-4'>
        <section className='h-5 w-48 bg-gray-200'></section>
        <section className='h-6 w-16 bg-gray-200'></section>
      </section>

      <CardBody className='flex flex-col gap-6 p-4 lg:flex-row'>
        <section className='flex flex-1 flex-col gap-3'>
          <section className='h-16 w-full bg-gray-100'></section>
          <section className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
            <section className='h-20 bg-gray-100'></section>
            <section className='h-20 bg-gray-100'></section>
            <section className='h-20 bg-gray-100'></section>
            <section className='h-20 bg-gray-100'></section>
          </section>
          <section className='h-12 w-full bg-gray-100'></section>
        </section>

        <section className='w-full shrink-0 lg:w-80'>
          <section className='h-64 w-full bg-gray-200'></section>
        </section>
      </CardBody>
    </Card>
  );
}

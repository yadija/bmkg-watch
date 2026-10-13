import { Card, CardBody, Typography } from '@material-tailwind/react';

interface EarthquakeListSkeletonProps {
  title: string;
}

export default function EarthquakeListSkeleton({ title }: EarthquakeListSkeletonProps) {
  return (
    <section className='my-4 w-full animate-pulse'>
      <section className='mb-3 flex items-center justify-between border-b pb-2'>
        <Typography variant='h2' className='text-lg font-bold text-gray-400'>
          {title}
        </Typography>
        <section className='h-5 w-16 rounded bg-gray-200'></section>
      </section>

      <section className='flex w-full flex-col gap-3'>
        {[...Array(5)].map((_, index) => (
          <Card key={index} className='w-full border border-gray-100 shadow-sm'>
            <CardBody className='flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center'>
              <section className='flex-1'>
                <section className='mb-2 flex items-center gap-3'>
                  <section className='h-6 w-14 rounded-full bg-gray-300'></section>
                  <section className='h-5 w-64 rounded bg-gray-300'></section>
                </section>

                <section className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
                  <section className='h-4 w-32 rounded bg-gray-200'></section>
                  <section className='h-4 w-28 rounded bg-gray-200'></section>
                  <section className='h-4 w-36 rounded bg-gray-200'></section>
                  <section className='h-4 w-24 rounded bg-gray-200'></section>
                </section>
              </section>

              <section className='h-8 w-28 rounded-lg bg-gray-200'></section>
            </CardBody>
          </Card>
        ))}
      </section>
    </section>
  );
}

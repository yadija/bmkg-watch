interface EarthquakeListSkeletonProps {
  title: string;
}

export default function EarthquakeListSkeleton({ title }: EarthquakeListSkeletonProps) {
  return (
    <section className='my-4 w-full animate-pulse'>
      <section className='mb-3 flex items-center justify-between border-b border-gray-200 pb-2 dark:border-zinc-800'>
        <h2 className='text-base font-bold text-gray-400 dark:text-zinc-600'>{title}</h2>
        <section className='h-5 w-16 bg-gray-200 dark:bg-zinc-800'></section>
      </section>

      <section className='flex w-full flex-col gap-3'>
        {[...Array(5)].map((_, index) => (
          <section
            key={index}
            className='w-full border border-gray-300 bg-white shadow-none dark:border-zinc-800 dark:bg-zinc-900'
          >
            <section className='flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center'>
              <section className='flex-1'>
                <section className='mb-2 flex items-center gap-2.5'>
                  <section className='h-6 w-12 bg-gray-300 dark:bg-zinc-700'></section>
                  <section className='h-5 w-64 bg-gray-300 dark:bg-zinc-700'></section>
                </section>

                <section className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
                  <section className='h-4 w-32 bg-gray-200 dark:bg-zinc-800'></section>
                  <section className='h-4 w-28 bg-gray-200 dark:bg-zinc-800'></section>
                  <section className='h-4 w-36 bg-gray-200 dark:bg-zinc-800'></section>
                  <section className='h-4 w-24 bg-gray-200 dark:bg-zinc-800'></section>
                </section>
              </section>

              <section className='h-8 w-28 bg-gray-200 dark:bg-zinc-800'></section>
            </section>
          </section>
        ))}
      </section>
    </section>
  );
}

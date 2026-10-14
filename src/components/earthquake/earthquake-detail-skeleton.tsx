export default function EarthquakeDetailSkeleton() {
  return (
    <section className='animate-pulse border border-gray-300 bg-white shadow-none dark:border-zinc-800 dark:bg-zinc-900'>
      <section className='flex items-center justify-between border-b border-gray-200 bg-gray-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/80'>
        <section className='h-5 w-48 bg-gray-200 dark:bg-zinc-800'></section>
        <section className='h-6 w-16 bg-gray-200 dark:bg-zinc-800'></section>
      </section>

      <section className='flex flex-col gap-6 p-4 lg:flex-row'>
        <section className='flex flex-1 flex-col gap-3'>
          <section className='h-16 w-full bg-gray-100 dark:bg-zinc-800/60'></section>
          <section className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
            <section className='h-20 bg-gray-100 dark:bg-zinc-800/60'></section>
            <section className='h-20 bg-gray-100 dark:bg-zinc-800/60'></section>
            <section className='h-20 bg-gray-100 dark:bg-zinc-800/60'></section>
            <section className='h-20 bg-gray-100 dark:bg-zinc-800/60'></section>
          </section>
          <section className='h-12 w-full bg-gray-100 dark:bg-zinc-800/60'></section>
        </section>

        <section className='w-full shrink-0 lg:w-80'>
          <section className='h-64 w-full bg-gray-200 dark:bg-zinc-800'></section>
        </section>
      </section>
    </section>
  );
}

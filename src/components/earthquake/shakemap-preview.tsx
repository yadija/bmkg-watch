import { useEffect, useState } from 'react';

interface ShakemapPreviewProps {
  shakemap?: string;
  className?: string;
}

export default function ShakemapPreview({ shakemap, className }: ShakemapPreviewProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  if (!shakemap) return null;

  const imageUrl = `https://data.bmkg.go.id/DataMKG/TEWS/${shakemap}`;

  return (
    <>
      <section className={className}>
        <button
          type='button'
          className='group relative block w-full border border-gray-300 bg-gray-100 dark:border-zinc-700 dark:bg-zinc-800'
          onClick={() => setOpen(true)}
          title='Klik untuk memperbesar shakemap'
          aria-label='Perbesar peta guncangan gempa BMKG'
        >
          <img
            src={imageUrl}
            alt='Shakemap'
            className='h-auto w-full transition-opacity group-hover:opacity-90'
          />
        </button>
      </section>

      {/* accessible flat modal overlay */}
      {open && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <button
            type='button'
            aria-label='Tutup dialog shakemap'
            tabIndex={-1}
            className='fixed inset-0 h-full w-full bg-black/60 backdrop-blur-sm'
            onClick={() => setOpen(false)}
          />
          <div
            role='dialog'
            aria-modal='true'
            aria-labelledby='shakemap-modal-title'
            className='relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto border border-gray-300 bg-white p-4 shadow-none dark:border-zinc-800 dark:bg-zinc-900'
          >
            <section className='mb-3 flex items-center justify-between border-b border-gray-200 pb-2 dark:border-zinc-800'>
              <section className='flex items-center gap-2'>
                <span className='border border-red-600 bg-red-600 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white'>
                  Shakemap
                </span>
                <h3
                  id='shakemap-modal-title'
                  className='text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-zinc-100'
                >
                  Peta Guncangan Gempa BMKG
                </h3>
              </section>
              <button
                type='button'
                onClick={() => setOpen(false)}
                className='border border-gray-300 bg-gray-50 px-2.5 py-1 text-xs font-bold text-gray-800 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900'
              >
                Tutup &times;
              </button>
            </section>

            <img
              src={imageUrl}
              alt='Shakemap BMKG'
              className='h-auto w-full border border-gray-200 bg-gray-100 dark:border-zinc-700 dark:bg-zinc-800'
            />
          </div>
        </div>
      )}
    </>
  );
}

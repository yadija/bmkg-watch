import { LuArrowLeft, LuFileQuestion } from 'react-icons/lu';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className='flex min-h-[60vh] flex-col items-center justify-center p-6 text-center'>
      <div className='border border-gray-300 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900'>
        <div className='mx-auto mb-4 flex size-12 items-center justify-center border border-gray-300 bg-gray-50 text-gray-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'>
          <LuFileQuestion className='size-6' />
        </div>
        <span className='border border-gray-300 bg-gray-100 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-gray-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'>
          404 &bull; Halaman Tidak Ditemukan
        </span>
        <h1 className='mt-3 text-lg font-bold text-gray-900 dark:text-zinc-100'>
          Halaman yang Anda cari tidak tersedia
        </h1>
        <p className='mt-1 max-w-md text-xs text-gray-700 dark:text-zinc-400'>
          Tautan mungkin rusak atau alamat URL yang Anda masukkan salah. Silakan kembali
          ke halaman utama.
        </p>
        <div className='mt-6'>
          <Link
            to='/'
            className='inline-flex items-center gap-2 border border-gray-900 bg-gray-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-gray-800 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200'
          >
            <LuArrowLeft className='size-3.5' />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

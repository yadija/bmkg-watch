import { useEffect, useState } from 'react';
import { LuMonitor, LuMoon, LuSun } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import { useTheme } from '@/context';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className='flex items-center border border-gray-300 bg-gray-50 p-0.5 dark:border-zinc-700 dark:bg-zinc-800'
      role='group'
      aria-label='Pilih mode tema'
    >
      <button
        type='button'
        onClick={() => setTheme('light')}
        title='Mode Terang'
        className={`rounded-none px-2 py-1 transition-colors ${
          theme === 'light'
            ? 'bg-white text-amber-600 shadow-none dark:bg-zinc-700 dark:text-amber-400'
            : 'text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100'
        }`}
      >
        <LuSun className='size-3.5' />
      </button>
      <button
        type='button'
        onClick={() => setTheme('dark')}
        title='Mode Gelap'
        className={`rounded-none px-2 py-1 transition-colors ${
          theme === 'dark'
            ? 'bg-white text-blue-600 shadow-none dark:bg-zinc-700 dark:text-blue-400'
            : 'text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100'
        }`}
      >
        <LuMoon className='size-3.5' />
      </button>
      <button
        type='button'
        onClick={() => setTheme('system')}
        title='Mode Sistem (Otomatis)'
        className={`rounded-none px-2 py-1 transition-colors ${
          theme === 'system'
            ? 'bg-white text-gray-900 shadow-none dark:bg-zinc-700 dark:text-zinc-100'
            : 'text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100'
        }`}
      >
        <LuMonitor className='size-3.5' />
      </button>
    </div>
  );
}

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navList = (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:my-0 lg:flex-row lg:items-center lg:gap-6'>
      <li className='p-1 text-sm font-normal'>
        <Link
          to='/weather'
          onClick={() => setOpenNav(false)}
          className='flex items-center font-medium text-gray-700 hover:text-blue-600 hover:underline dark:text-zinc-300 dark:hover:text-blue-400'
        >
          Cuaca
        </Link>
      </li>
      <li className='p-1 text-sm font-normal'>
        <Link
          to='/earthquake'
          onClick={() => setOpenNav(false)}
          className='flex items-center font-medium text-gray-700 hover:text-blue-600 hover:underline dark:text-zinc-300 dark:hover:text-blue-400'
        >
          Gempa
        </Link>
      </li>
    </ul>
  );

  return (
    <header className='sticky top-0 z-50 w-full border-b border-gray-300 bg-white px-4 py-3 shadow-none dark:border-zinc-800 dark:bg-zinc-900 lg:px-8'>
      <section className='flex items-center justify-between text-gray-900 dark:text-zinc-100'>
        <div className='mr-4 py-1 font-bold'>
          <Link
            to='/'
            className='flex cursor-pointer items-center gap-2 text-lg text-gray-900 dark:text-zinc-100'
          >
            <span className='size-2.5 bg-blue-600'></span>
            <span className='tracking-tight'>BMKG Watch</span>
          </Link>
        </div>
        <section className='flex items-center gap-4'>
          <section className='mr-4 hidden lg:block'>{navList}</section>
          <section className='hidden lg:block'>
            <ThemeSwitcher />
          </section>
          <button
            type='button'
            aria-label={openNav ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={openNav}
            className='ml-auto inline-flex size-8 items-center justify-center text-gray-800 hover:text-gray-900 focus:outline-none dark:text-zinc-200 dark:hover:text-white lg:hidden'
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                className='size-6'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='size-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </button>
        </section>
      </section>
      {openNav && (
        <div className='border-t border-gray-200 pt-3 dark:border-zinc-800 lg:hidden'>
          {navList}
          <div className='mt-3 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-zinc-800'>
            <span className='text-xs font-bold text-gray-600 dark:text-zinc-400'>
              Mode Tampilan:
            </span>
            <ThemeSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}

import {
  LuCloud,
  LuExternalLink,
  LuGithub,
  LuGlobe,
  LuInstagram,
  LuLinkedin,
  LuRadio,
} from 'react-icons/lu';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='mt-12 border-t border-gray-300 bg-white text-gray-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100'>
      {/* main footer content */}
      <section className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <section className='grid grid-cols-1 gap-8 md:grid-cols-12'>
          {/* brand and mission */}
          <section className='flex flex-col gap-3 md:col-span-4'>
            <section className='flex items-center gap-2'>
              <span className='size-2.5 bg-blue-600'></span>
              <span className='text-base font-bold tracking-tight text-gray-900 dark:text-zinc-100'>
                BMKG Watch
              </span>
              <span className='border border-teal-700 bg-teal-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white'>
                Open Data
              </span>
            </section>

            <p className='text-xs leading-relaxed text-gray-700 dark:text-zinc-300'>
              Portal pemantauan mandiri data cuaca, iklim, dan aktivitas seismik gempa
              bumi di seluruh wilayah Indonesia. Data disinkronkan secara langsung dari
              sistem resmi Badan Meteorologi, Klimatologi, dan Geofisika (BMKG).
            </p>

            <section className='flex items-center gap-2 text-xs text-gray-600 dark:text-zinc-400'>
              <span className='size-2 bg-teal-600'></span>
              <span className='font-medium text-gray-800 dark:text-zinc-200'>
                Layanan Pemantauan Aktif
              </span>
            </section>
          </section>

          {/* quick navigation */}
          <section className='flex flex-col gap-2.5 md:col-span-2'>
            <p className='text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-zinc-100'>
              Navigasi
            </p>
            <ul className='flex flex-col gap-2 text-xs'>
              <li>
                <Link
                  to='/'
                  className='inline-flex items-center gap-1.5 font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400'
                >
                  &rarr; Beranda
                </Link>
              </li>
              <li>
                <Link
                  to='/weather'
                  className='inline-flex items-center gap-1.5 font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400'
                >
                  <LuCloud size={13} className='text-blue-600 dark:text-blue-400' />
                  <span>Cuaca</span>
                </Link>
              </li>
              <li>
                <Link
                  to='/earthquake'
                  className='inline-flex items-center gap-1.5 font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400'
                >
                  <LuRadio size={13} className='text-red-600 dark:text-red-400' />
                  <span>Gempa Bumi</span>
                </Link>
              </li>
            </ul>
          </section>

          {/* external official links and data sources */}
          <section className='flex flex-col gap-2.5 md:col-span-3'>
            <p className='text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-zinc-100'>
              Portal Resmi BMKG
            </p>
            <section className='flex flex-col gap-2 text-xs'>
              <a
                href='https://www.bmkg.go.id'
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-1.5 font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400'
              >
                <LuExternalLink size={13} className='shrink-0' />
                <span>Portal bmkg.go.id</span>
              </a>
              <a
                href='https://inatews.bmkg.go.id'
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-1.5 font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400'
              >
                <LuExternalLink size={13} className='shrink-0' />
                <span>Portal InaTEWS</span>
              </a>
              <p className='mt-1 text-[11px] leading-relaxed text-gray-500 dark:text-zinc-400'>
                Tautan di atas mengarah langsung ke sistem resmi instansi BMKG.
              </p>
            </section>
          </section>

          {/* developer profile section with explicit disclaimer */}
          <section className='flex flex-col gap-2.5 md:col-span-3'>
            <p className='text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-zinc-100'>
              Profil Pengembang
            </p>
            <p className='text-[11px] leading-relaxed text-gray-600 dark:text-zinc-400'>
              Tautan di bawah ini adalah akun personal pengembang aplikasi.
            </p>

            {/* developer social tiles */}
            <section className='mt-1 flex items-center gap-1.5'>
              <a
                href='https://linkedin.com/in/achmad-yuliadi'
                target='_blank'
                rel='noreferrer'
                className='flex size-8 items-center justify-center border border-gray-300 bg-white text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900'
                title='LinkedIn Pengembang (Non-BMKG)'
                aria-label='LinkedIn Pengembang'
              >
                <LuLinkedin size={15} />
              </a>
              <a
                href='https://github.com/yadija'
                target='_blank'
                rel='noreferrer'
                className='flex size-8 items-center justify-center border border-gray-300 bg-white text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900'
                title='GitHub Pengembang (Non-BMKG)'
                aria-label='GitHub Pengembang'
              >
                <LuGithub size={15} />
              </a>
              <a
                href='https://www.instagram.com/yadija_'
                target='_blank'
                rel='noreferrer'
                className='flex size-8 items-center justify-center border border-gray-300 bg-white text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900'
                title='Instagram Pengembang (Non-BMKG)'
                aria-label='Instagram Pengembang'
              >
                <LuInstagram size={15} />
              </a>
              <a
                href='https://yadija.github.io'
                target='_blank'
                rel='noreferrer'
                className='flex size-8 items-center justify-center border border-gray-300 bg-white text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900'
                title='Website Portofolio Pengembang (Non-BMKG)'
                aria-label='Website Portofolio Pengembang'
              >
                <LuGlobe size={15} />
              </a>
            </section>
          </section>
        </section>
      </section>

      {/* bottom copyright strip */}
      <section className='border-t border-gray-200 bg-gray-50/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/60 sm:px-6 lg:px-8'>
        <section className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-gray-600 dark:text-zinc-400 sm:flex-row'>
          <p>
            &copy; {currentYear} <strong>BMKG Watch</strong>. Dibuat oleh pengembang
            independen dengan memanfaatkan API terbuka BMKG.
          </p>
          <p className='text-[11px] text-gray-500 dark:text-zinc-500'>
            Data meteorologi & seismik resmi disediakan oleh BMKG Indonesia
          </p>
        </section>
      </section>
    </footer>
  );
}

import {
  Collapse,
  IconButton,
  Navbar as NavbarMaterial,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navList = (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:my-0 lg:flex-row lg:items-center lg:gap-6'>
      <Typography as='li' variant='small' color='blue-gray' className='p-1 font-normal'>
        <Link
          to='/weather'
          onClick={() => setOpenNav(false)}
          className='flex items-center font-medium hover:text-blue-500 hover:underline'
        >
          Cuaca
        </Link>
      </Typography>
      <Typography as='li' variant='small' color='blue-gray' className='p-1 font-normal'>
        <Link
          to='/earthquake'
          onClick={() => setOpenNav(false)}
          className='flex items-center font-medium hover:text-blue-500 hover:underline'
        >
          Gempa
        </Link>
      </Typography>
    </ul>
  );

  return (
    <NavbarMaterial className='h-max max-w-full rounded-none border-b border-gray-300 bg-white px-4 py-3 shadow-none lg:px-8'>
      <section className='flex items-center justify-between text-blue-gray-900'>
        <Typography as='section' className='mr-4 py-1 font-bold'>
          <Link
            to='/'
            className='flex cursor-pointer items-center gap-2 text-lg text-blue-gray-900'
          >
            <span className='size-2.5 bg-blue-600'></span>
            <span className='tracking-tight'>BMKG Watch</span>
          </Link>
        </Typography>
        <section className='flex items-center gap-4'>
          <section className='mr-4 hidden lg:block'>{navList}</section>
          <IconButton
            variant='text'
            className='ml-auto size-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
            ripple={false}
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
          </IconButton>
        </section>
      </section>
      <Collapse open={openNav}>{navList}</Collapse>
    </NavbarMaterial>
  );
}

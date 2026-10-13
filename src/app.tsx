import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Footer from './components/footer';
import Navbar from './components/navbar';

const HomePage = lazy(() => import('./pages/home-page'));
const EarthquakePage = lazy(() => import('./pages/earthquake-page'));
const WeatherPage = lazy(() => import('./pages/weather-page'));

function PageFallback() {
  return (
    <section className='flex min-h-[50vh] items-center justify-center'>
      <section className='size-9 animate-spin rounded-full border-4 border-blue-600 border-t-transparent'></section>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className='container mx-auto p-4'>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/earthquake' element={<EarthquakePage />} />
            <Route path='/weather' element={<WeatherPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

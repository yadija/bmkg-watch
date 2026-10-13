import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

const HomePage = lazy(() => import('./pages/HomePage'));
const EarthquakePage = lazy(() => import('./pages/EarthquakePage'));
const WeatherPage = lazy(() => import('./pages/WeatherPage'));

function PageFallback() {
  return (
    <div className='flex min-h-[50vh] items-center justify-center'>
      <div className='size-9 animate-spin rounded-full border-4 border-blue-600 border-t-transparent'></div>
    </div>
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
            <Route path='/gempa' element={<EarthquakePage />} />
            <Route path='/cuaca' element={<WeatherPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

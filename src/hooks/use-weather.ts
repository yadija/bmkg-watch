import { useCallback, useEffect, useRef, useState } from 'react';

import { DEFAULT_ADM4 } from '@/constants';
import { fetchWeather } from '@/services';
import { BmkgWeatherResponse } from '@/types';

export interface UseWeatherResult {
  weather: BmkgWeatherResponse | null;
  loading: boolean;
  error: string | null;
  adm4: string;
  setAdm4: (adm4: string) => void;
  loadWeather: (targetAdm4: string) => Promise<void>;
}

export function useWeather(initialAdm4: string = DEFAULT_ADM4): UseWeatherResult {
  const [adm4, setAdm4] = useState<string>(initialAdm4);
  const [weather, setWeather] = useState<BmkgWeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const loadWeather = useCallback(async (targetAdm4: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(targetAdm4, controller.signal);
      if (!controller.signal.aborted) {
        if (data) {
          setWeather(data);
        } else {
          setError('Gagal memuat data cuaca untuk wilayah ini.');
        }
        setLoading(false);
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(
          err instanceof Error
            ? err.message
            : 'Terjadi kesalahan saat memuat data cuaca.',
        );
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadWeather(initialAdm4);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [initialAdm4, loadWeather]);

  return {
    weather,
    loading,
    error,
    adm4,
    setAdm4,
    loadWeather,
  };
}

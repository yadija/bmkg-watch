import { useCallback, useEffect, useRef, useState } from 'react';

import {
  fetchEarthquake5Min,
  fetchEarthquakeFelt,
  fetchNewestEarthquake,
} from '@/services';
import { EarthquakeData, NewestEarthquake } from '@/types';

export interface UseLatestEarthquakeResult {
  earthquake: NewestEarthquake | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useLatestEarthquake(): UseLatestEarthquakeResult {
  const [earthquake, setEarthquake] = useState<NewestEarthquake | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchLatest = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchNewestEarthquake(controller.signal);
      if (!controller.signal.aborted) {
        if (data) {
          setEarthquake(data);
        } else {
          setError('Gagal memuat data gempa terkini.');
        }
        setLoading(false);
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(
          err instanceof Error
            ? err.message
            : 'Terjadi kesalahan saat memuat data gempa.',
        );
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchLatest();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchLatest]);

  return {
    earthquake,
    loading,
    error,
    refetch: fetchLatest,
  };
}

export interface UseEarthquakesResult {
  newestEarthquake: NewestEarthquake | null;
  earthquake5Min: EarthquakeData[] | null;
  earthquakeFelt: EarthquakeData[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useEarthquakes(): UseEarthquakesResult {
  const [newestEarthquake, setNewestEarthquake] = useState<NewestEarthquake | null>(null);
  const [earthquake5Min, setEarthquake5Min] = useState<EarthquakeData[] | null>(null);
  const [earthquakeFelt, setEarthquakeFelt] = useState<EarthquakeData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchAllEarthquakes = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const [newest, eq5Min, eqFelt] = await Promise.all([
        fetchNewestEarthquake(controller.signal),
        fetchEarthquake5Min(controller.signal),
        fetchEarthquakeFelt(controller.signal),
      ]);

      if (!controller.signal.aborted) {
        setNewestEarthquake(newest);
        setEarthquake5Min(eq5Min);
        setEarthquakeFelt(eqFelt);

        if (!newest && !eq5Min && !eqFelt) {
          setError('Gagal memuat seluruh data gempa dari BMKG.');
        }
        setLoading(false);
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(
          err instanceof Error
            ? err.message
            : 'Terjadi kesalahan saat memuat data gempa.',
        );
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchAllEarthquakes();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchAllEarthquakes]);

  return {
    newestEarthquake,
    earthquake5Min,
    earthquakeFelt,
    loading,
    error,
    refetch: fetchAllEarthquakes,
  };
}

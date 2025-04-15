'use client';
import { getMyRecyclingLocations } from '@/services/recyclingLocationService';
import useSWR from 'swr';

export function useMyRecyclingLocations() {
  const { data, error, isLoading, mutate } = useSWR(
    'recycling-locations/my-locations', // chave única para o cache do SWR
    getMyRecyclingLocations
  );

  return {
    locations: data || [],
    loading: isLoading,
    error,
    refetch: mutate,
  };
}

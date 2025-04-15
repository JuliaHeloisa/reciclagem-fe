'use client';
import useSWR from 'swr';
import { getRecyclingLocations } from "../services/recyclingLocationService";

export function useRecyclingLocations() {
  const { data, error, isLoading, mutate } = useSWR(
    'recycling-locations',
    getRecyclingLocations
  );

  return {
    locations: data || [],
    loading: isLoading,
    error,
    refetch: mutate,
  };
}


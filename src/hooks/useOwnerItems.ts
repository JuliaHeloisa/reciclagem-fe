'use client';
import useSWR from 'swr';
import api from '@/services/api';

export function useOwnerItems() {
  const { data, error, isLoading } = useSWR(
    'owner-items',
    async () => {
      const res = await api.get('/owner/items');
      return res.data;
    }
  );

  return {
    items: data || [],
    loading: isLoading,
    error,
  };
}

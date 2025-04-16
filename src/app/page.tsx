// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/all-locations');
    } else {
      router.replace('/login');
    }
  }, [user, router]);

  return null; // Não renderiza nada enquanto redireciona
}

// src/components/ProtectedRoute.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !allowedRoles.includes(user.role)) {
      router.push('/all-locations'); 
    }
  }, [user, allowedRoles, router]);

  if (!user) {
    return <p>Carregando...</p>;
  }

  return <>{children}</>;
}

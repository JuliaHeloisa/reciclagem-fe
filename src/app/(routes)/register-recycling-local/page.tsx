'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RegisterLocalForm from '@/components/RegisterLocalForm';
import { Layout } from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function RegistrarPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'owner') {
      router.push('/all-locations');
    }
  }, [user, router]);

  return user?.role === 'owner' ? (
    <Layout>
      <ProtectedRoute allowedRoles={['owner']}>
        <RegisterLocalForm />
      </ProtectedRoute>
    </Layout>
  ) : null;
  }

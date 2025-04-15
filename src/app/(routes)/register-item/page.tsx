'use client';

import { Layout } from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import RegisterItemForm from '@/components/RegisterItemForm';

export default function RegisterItemPage() {
  return(
      <Layout>
        <ProtectedRoute allowedRoles={['common']}>
          <RegisterItemForm />
        </ProtectedRoute>
      </Layout>
    );
}

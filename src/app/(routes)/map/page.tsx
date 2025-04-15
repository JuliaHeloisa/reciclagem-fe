'use client'
import { Layout } from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import dynamic from "next/dynamic";
const Map = dynamic(() => import('@/components/Map'), {
    ssr: false, // ESSENCIAL!
    loading: () => <p>Carregando mapa...</p>,
  });
export default function Page() {
    return (
      <Layout>
        <ProtectedRoute allowedRoles={['common', 'owner']}>
          <Map />
        </ProtectedRoute>
      </Layout>)
}
"use client";
export const dynamic = 'force-dynamic';
import AllLocations from "@/components/AllLocations";
import { Layout } from "@/components/Layout";

export default function Page() {
  return (
    <Layout>
      <AllLocations />
    </Layout>
  )
}
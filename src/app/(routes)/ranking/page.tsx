import { Layout } from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import RankingList from "@/components/RankingList";

export default function Page() {
    return (
        <Layout>
            <ProtectedRoute allowedRoles={['common']}>
                <RankingList />
            </ProtectedRoute>
        </Layout>
    );
}
import { Layout } from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserItemList from "@/components/UserItemList"

export default function Page() {
    return (
        <Layout>
            <ProtectedRoute allowedRoles={['common']}>
                <UserItemList />
            </ProtectedRoute>
        </Layout>
    );
}
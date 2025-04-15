import { Layout } from "@/components/Layout";
import OwnerItemList from "@/components/OwnerItemList";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function MyItems() {
    return (
        <Layout>
            <ProtectedRoute allowedRoles={['owner']}>
                <OwnerItemList />
            </ProtectedRoute>
        </Layout>
    );
}
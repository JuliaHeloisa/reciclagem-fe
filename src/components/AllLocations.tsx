import { useAuth } from "@/hooks/useAuth";
import { Typography } from "@mui/joy";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OwnerLocationList from "./OwnerLocationList";
import { RecyclingList } from "./RecyclingList";

export default function AllLocations() {
    const auth = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    if (auth?.user === null) {
        router.push("/login");
    } else if (auth?.user) {
        setLoading(false);
    }
    }, [auth?.user, router]);

    if (loading) {
    return <p>Carregando...</p>;
    }

    return (
        <>
            <Typography level="h2" sx={{ mb: 3, color: 'neutral.100', display: 'flex', justifyContent: 'center' }}>
                Locais de Reciclagem
            </Typography>
                {auth?.user?.role === 'owner' ? (
                    <OwnerLocationList />
                ) : (
                    <RecyclingList />
                )}
        </>
    );
}
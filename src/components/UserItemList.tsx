'use client';

import { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Stack } from '@mui/joy';
import { useAuth } from '@/hooks/useAuth';
import { getMyItems } from '@/services/itemService';

interface RecyclingItem {
  id: string;
  material: string;
  quantity: number;
  date: string;
  location?: {
    name: string;
  };
}

export default function UserItemList() {
  const { user } = useAuth();
  const [items, setItems] = useState<RecyclingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'common') return;

    const fetchItems = async () => {
      try {
        const data = await getMyItems();
        setItems(data);
      } catch (err) {
        console.error('Erro ao buscar itens do usuário:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [user]);

  if (user?.role !== 'common') return null;
  if (loading) return <Typography>Carregando itens...</Typography>;
  if (items.length === 0) return <Typography>Você ainda não cadastrou itens.</Typography>;

  return (
    <>
      <Typography level="h2" sx={{ mb: 3, color: 'neutral.100', display: 'flex', justifyContent: 'center' }}>Meus itens</Typography><Stack spacing={2}>
        {items.map((item) => (
          <Card key={item.id} sx={{ backgroundColor: '#e0e4ce' }}>
            <CardContent>
              <Typography level="h4">{item.material}</Typography>
              <Typography>
                Quantidade: {item.quantity} — Data: {new Date(item.date).toLocaleDateString()}
              </Typography>
              <Typography>Local: {item.location?.name || 'Desconhecido'}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
}

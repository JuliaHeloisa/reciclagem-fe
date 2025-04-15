'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/joy';
import { getItemsFromMyLocations } from '@/services/itemService';

interface RecyclingItem {
  id: string;
  material: string;
  quantity: number;
  unit: string;
  date: string;
  location: {
    name: string;
    address: string;
  };
}

export default function OwnerItemList() {
  const [items, setItems] = useState<RecyclingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItemsFromMyLocations();
        setItems(data);
      } catch (error) {
        console.error('Erro ao buscar itens reciclados dos meus locais:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <p>Carregando itens reciclados...</p>;
  
  const localDate = (item: { date: string | number | Date; }) => new Date(item.date);

  return (
    <>
      <Typography level="h2" sx={{ mb: 3, color: 'neutral.100', display: 'flex', justifyContent: 'center' }}>
        Itens reciclados (meus locais)
      </Typography><Stack spacing={2}>
          {items.length === 0 ? (
            <Typography>Nenhum item reciclado foi registrado ainda.</Typography>
          ) : (
            items.map((item) => (
              <Card key={item.id} sx={{ backgroundColor: '#2d3839' }}>
                <CardContent>
                  <Typography level="title-md" sx={{ color: '#e0e4ce' }}>{item.material}</Typography>
                  <Typography sx={{ color: '#e0e4ce' }}>
                    Quantidade: {item.quantity} {item.unit}
                  </Typography>
                  <Typography sx={{ color: '#e0e4ce' }}>Data: {`${localDate(item).getDate()}/${localDate(item).getMonth()}/${localDate(item).getFullYear()}`}</Typography>
                  <Typography level="body-sm" mt={1} sx={{ color: '#e0e4ce' }}>
                    Local: {item.location.name} - {item.location.address}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </>
  );
}

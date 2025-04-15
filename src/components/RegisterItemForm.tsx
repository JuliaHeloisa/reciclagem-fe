'use client';

import { useAuth } from '@/hooks/useAuth';
import { registerRecyclingItem } from '@/services/itemService';
import { getRecyclingLocations } from '@/services/recyclingLocationService';
import {
  Box,
  Button,
  Input,
  Option,
  Select,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface RecyclingLocation {
    id?: string;
    name: string;
    address: string;
    materialsAccepted?: string;
    contact?: string;
    openingHours?: string;
    latitude?: number;
    longitude?: number;
  }
  

export default function RegisterItemForm() {
  const { user } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    material: '',
    quantity: '',
    unit: '',
    date: '',
    recyclingLocationId: '',
  });

  const [locations, setLocations] = useState<RecyclingLocation[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.role !== 'common') {
      router.push('/all-locations');
    }
  }, [user, router]);

  useEffect(() => {
    const fetchLocations = async () => {
      const result = await getRecyclingLocations();
      setLocations(result);
    };
    fetchLocations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerRecyclingItem(form);
      router.push('/all-locations');
    } catch (err) {
      setError('Erro ao registrar item. Verifique os dados.');
      console.error('Erro ao registrar item:', err);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ p: 2 }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: '100%',
          maxWidth: 500,
          p: 4,
          borderRadius: 'lg',
          boxShadow: 'lg',
          backgroundColor: '#e0e4ce',
        }}
      >
        <Typography level="h4" mb={2} textAlign="center">
          Registrar Item Reciclado
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Select
              name="material"
              placeholder="Tipo de material"
              value={form.material}
              onChange={(_, value) => setForm((prev) => ({ ...prev, material: value! }))}
              required
              sx={{ 
                color: '#000',
              }}
            >
              <Option value="Plástico">Plástico</Option>
              <Option value="Papel">Papel</Option>
              <Option value="Vidro">Vidro</Option>
              <Option value="Metal">Metal</Option>
            </Select>

            <Input
              name="quantity"
              type="number"
              placeholder="Quantidade"
              value={form.quantity}
              onChange={handleChange}
              required
              sx={{
                '--Input-placeholderColor': '#000'
              }}
            />

            <Select
              name="unit"
              placeholder="Unidade"
              value={form.unit}
              onChange={(_, value) => setForm((prev) => ({ ...prev, unit: value!}))}
              required
              sx={{ 
                color: '#000',
              }}
            >
              <Option value="kg">Quilos</Option>
              <Option value="units">Unidades</Option>
            </Select>

            <Input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />

            <Select
              name="recyclingLocationId"
              placeholder="Local de reciclagem"
              value={form.recyclingLocationId}
              onChange={(_, value) => setForm((prev) => ({ ...prev, recyclingLocationId: value! }))}
              required
              sx={{ 
                color: '#000',
              }}
            >
              {locations.map((loc: RecyclingLocation) => (
                <Option key={loc.id} value={loc.id}>
                  {loc.name}
                </Option>
              ))}
            </Select>

            {error && (
              <Typography level="body-sm" color="danger">
                {error}
              </Typography>
            )}

            <Button type="submit" sx={{ backgroundColor: '#114d4d' }}>
              Registrar
            </Button>
          </Stack>
        </form>
      </Sheet>
    </Box>
  );
}

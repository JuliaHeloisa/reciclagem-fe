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
            <Typography level="body-sm" textAlign="center">
              Preencha os campos abaixo para registrar um item reciclado.
            </Typography>
            <Typography level="body-sm" color="primary">
              Tipo de material
            </Typography>
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
              <Option value="Pilha">Pilha</Option>
              <Option value="Bateria">Bateria</Option>
              <Option value="Placa Eletrônica">Placa Eletrônica</Option>
              <Option value="Memória">Memória</Option>
              <Option value="SSD">SSD</Option>
              <Option value="Circuito Eletrônico">Circuito Eletrônico</Option>
              <Option value="Tela">Tela</Option>
              <Option value="Smartphone">Smartphone</Option>
              <Option value="Carregador">Carregador</Option>
              <Option value="Outros">Outros</Option>
            </Select>
            <Typography level="body-sm" color="primary">
              Quantidade
            </Typography>
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
            <Typography level="body-sm" color="primary">
              Unidade
            </Typography>
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
            <Typography level="body-sm" color="primary">
              Data    
            </Typography>   
            <Input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
            <Typography level="body-sm" color="primary">
              Local de reciclagem
            </Typography> 
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

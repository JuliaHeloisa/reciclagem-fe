'use client';

import { createRecyclingLocation } from '@/services/recyclingLocationService';
import { Box, Button, Input, Sheet, Stack, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const placeholder = {
  name: 'Nome do Local',
  address: 'Endereço',
  materialsAccepted: 'Materiais Aceitos',
  contact: 'Contato',
  openingHours: 'Horário de Funcionamento',
};

export default function RegisterLocalForm() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    materialsAccepted: '',
    contact: '',
    openingHours: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await createRecyclingLocation({
        ...form,
      });
      router.push('/all-locations');
    } catch (err) {
      setError('Erro ao cadastrar local. Verifique os dados.');
      console.error(err);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Sheet
        sx={{
          width: '100%',
          maxWidth: 500,
          p: 4,
          borderRadius: 'lg',
          backgroundColor: '#e0e4ce',
          boxShadow: 'lg',
        }}
      >
        <Typography level="h4" textAlign="center" mb={2}>
          Cadastrar Local de Reciclagem
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {['name', 'address', 'materialsAccepted', 'contact', 'openingHours'].map((field) => (
              <Input
                key={field}
                placeholder={placeholder[field as keyof typeof placeholder]}
                name={field}
                value={form[field as keyof typeof form]}
                onChange={handleChange}
                required
              />
            ))}

            {error && (
              <Typography color="danger" level="body-sm">
                {error}
              </Typography>
            )}
            <Button type="submit" sx={{ backgroundColor: '#114d4d' }}>
              Cadastrar
            </Button>
          </Stack>
        </form>
      </Sheet>
    </Box>
  );
}

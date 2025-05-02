'use client';

import { createRecyclingLocation } from '@/services/recyclingLocationService';
import {
  Box,
  Button,
  Input,
  Sheet,
  Stack,
  Typography,
  Checkbox,
} from '@mui/joy';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const placeholder = {
  name: 'Nome do Local',
  address: 'Endereço',
  contact: 'Contato',
  openingHours: 'Horário de Funcionamento',
};

const materialOptions = [
  'Pilha',
  'Bateria',
  'Placa Eletrônica',
  'Memória',
  'SSD',
  'Circuito Eletrônico',
  'Tela',
  'Smartphone',
  'Carregador',
  'Outros',
];

export default function RegisterLocalForm() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    materialsAccepted: '', // será preenchido pelos checkboxes
    contact: '',
    openingHours: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (material: string, checked: boolean) => {
    const current = form.materialsAccepted
      .split(',')
      .map((m) => m.trim())
      .filter((m) => m.length > 0);

    const updated = checked
      ? [...current, material]
      : current.filter((m) => m !== material);

    setForm((prev) => ({
      ...prev,
      materialsAccepted: updated.join(','),
    }));
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
            {/* Campos de texto */}
            {['name', 'address', 'contact', 'openingHours'].map((field) => (
              <div key={field}>
                <Typography level="body-sm" color="primary">
                  {placeholder[field as keyof typeof placeholder]}
                </Typography>
                <Input
                  placeholder={placeholder[field as keyof typeof placeholder]}
                  name={field}
                  value={form[field as keyof typeof form]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            {/* Checkboxes de materiais */}
            <Typography level="body-sm" color="primary">
              Materiais Aceitos
            </Typography>
            <Stack spacing={1}>
              {materialOptions.map((material) => (
                <Checkbox
                  key={material}
                  label={material}
                  checked={form.materialsAccepted.includes(material)}
                  onChange={(e) =>
                    handleCheckboxChange(material, e.target.checked)
                  }
                />
              ))}
            </Stack>

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

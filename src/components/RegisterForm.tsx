'use client';

import {
  Box,
  Button,
  Input,
  Stack,
  Typography,
  Sheet,
  Select,
  Option,
  Link,
} from '@mui/joy';
import { useState } from 'react';
import { registerUser } from '@/services/user';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: '', // 👈 novo campo
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (!form.type) {
      setError('Por favor, selecione o tipo de usuário.');
      return;
    }

    try {
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.type, // 👈 enviado no cadastro
      });
      router.push('/login');
    } catch (err) {
      setError(`Erro ao cadastrar. Verifique os dados. Detalhes: ${err}`);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: '#e0e4ce', p: 2 }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 'lg',
          boxShadow: 'lg',
          backgroundColor: '#fff',
        }}
      >
        <Typography level="h4" textAlign="center" mb={2}>
          Criar Conta
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Input
              placeholder="Nome"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Senha"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Confirmar Senha"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            {/* Select de Tipo */}
            <Select
              placeholder="É dono de um local de reciclagem?"
              value={form.type}
              onChange={(_, value) => setForm((prev) => ({ ...prev, type: value || '' }))}
              required
            >
              <Option value="owner">Sim</Option>
              <Option value="common">Não</Option>
            </Select>

            {error && (
              <Typography color="danger" level="body-sm">
                {error}
              </Typography>
            )}

            <Button type="submit" fullWidth sx={{ mt: 1, bgcolor: '#114d4d' }}>
              Cadastrar
            </Button>
            <Typography level="body-sm" textAlign="center">
              Já tem conta?{' '}
              <Link href="/login" underline="hover">
                Login
              </Link>
            </Typography>
          </Stack>
        </form>
      </Sheet>
    </Box>
  );
}

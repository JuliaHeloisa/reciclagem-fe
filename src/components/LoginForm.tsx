'use client';

import { useState, useContext } from 'react';
import {
  Box,
  Button,
  Input,
  Typography,
  Stack,
  Sheet,
  Link
} from '@mui/joy';
import { AuthContext } from '@/context/AuthContext';
import NextLink from 'next/link';

export default function LoginPage() {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErro('');
    setLoading(true);

    try {
      if (!auth) {
        setErro('Erro de autenticação.');
        return;
      }

      await auth.login(email, senha);
    } catch (err) {
      setErro(`Credenciais inválidas. Tente novamente.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#e0e4ce',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: {
            xs: '100%',
            sm: 360,
            md: 400,
          },
          p: {
            xs: 3,
            sm: 4,
          },
          borderRadius: 'md',
          boxShadow: 'lg',
          backgroundColor: '#fff',
        }}
      >
        <Stack spacing={2}>
          <Typography level="h3" textAlign="center" color="primary">
            Recicla+
          </Typography>
          <Typography level="h3" textAlign="center" color="neutral">
            Entrar
          </Typography>

          {erro && (
            <Typography level="body-sm" color="danger">
              {erro}
            </Typography>
          )}

          <Input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            required
            fullWidth
          />
          <Input
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            type="password"
            required
            fullWidth
          />

          <Button
            onClick={handleLogin}
            loading={loading}
            fullWidth
            sx={{
              backgroundColor: '#114d4d',
              '&:hover': {
                backgroundColor: '#0e3d3d',
              },
            }}
          >
            Entrar
          </Button>

          {/* Link de cadastro */}
          <Typography level="body-sm" textAlign="center">
            Não tem conta?{' '}
            <Link component={NextLink} href="/register" underline="hover">
              Cadastre-se!
            </Link>
          </Typography>
        </Stack>
      </Sheet>
    </Box>
  );
}

'use client';

import { Box, Typography, Sheet, Stack, Button } from '@mui/joy';
import { ReactNode } from 'react';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export function Layout({ children }: { children: ReactNode }) {
  const  auth = useAuth();
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sheet
        variant="solid"
        color="primary"
        sx={{
          width: 240,
          p: 3,
          backgroundColor: '#2d3839',
          borderRight: '1px solid #6e9987',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo e Menu */}
        <Box>
          <Typography level="h4" textColor="#e0e4ce" mb={3}>
            Recicla+
          </Typography>
          <Stack spacing={1}>
            <Link href="/all-locations" style={{ textDecoration: 'none' }}>
              <Button fullWidth variant="soft" color="neutral">
                Locais de reciclagem
              </Button>
            </Link>
            { 
              auth?.user?.role === 'owner' && (
                <><Link href="/register-recycling-local" style={{ textDecoration: 'none' }}>
                  <Button fullWidth variant="soft" color="neutral">
                    Registrar local de reciclagem
                  </Button>
                </Link><Link href="/owner-items" style={{ textDecoration: 'none' }}>
                    <Button fullWidth variant="soft" color="neutral">
                      Itens para meus locais
                    </Button>
                  </Link></>
              )
            }
            {auth?.user?.role === 'common' && (
              <>
                <Link href="/register-item" style={{ textDecoration: 'none' }}>
                  <Button fullWidth variant="soft" color="neutral">
                    Registrar item
                  </Button>
                </Link>
                <Link href="/ranking" style={{ textDecoration: 'none' }}>
                  <Button fullWidth variant="soft" color="neutral">
                    Ranking
                  </Button>
                </Link>
                <Link href="/user-items" style={{ textDecoration: 'none' }}>
                  <Button fullWidth variant="soft" color="neutral">
                    Meus itens
                  </Button>
                </Link>
              </>
            )}
            <Link href="/map" style={{ textDecoration: 'none' }}>
              <Button fullWidth variant="soft" color="neutral">
                Mapa
              </Button>
            </Link>
          </Stack>
        </Box>

        {/* Logout com ícone */}
        <Box mt={4}>
          <Button
            variant="soft"
            color="danger"
            fullWidth
            startDecorator={<LogoutRoundedIcon />}
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
          >
            Sair
          </Button>
        </Box>
      </Sheet>
      <Box
        sx={{
          flex: 1,
          p: 4,
          backgroundColor: '#6e9987',
          color: '#fff',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

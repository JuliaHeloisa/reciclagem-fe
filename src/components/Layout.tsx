'use client';

import { Box, Typography, Sheet, Stack, Button, IconButton, Drawer } from '@mui/joy';
import { ReactNode, useState } from 'react';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export function Layout({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const [open, setOpen] = useState(false);

  const renderSidebarContent = () => (
    <>
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
          {auth?.user?.role === 'owner' && (
            <>
              <Link href="/register-recycling-local" style={{ textDecoration: 'none' }}>
                <Button fullWidth variant="soft" color="neutral">
                  Registrar local de reciclagem
                </Button>
              </Link>
              <Link href="/owner-items" style={{ textDecoration: 'none' }}>
                <Button fullWidth variant="soft" color="neutral">
                  Itens para meus locais
                </Button>
              </Link>
            </>
          )}
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
    </>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: { xs: 'column', sm: 'row' } }}>
      {/* Menu ícone para mobile */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          justifyContent: 'flex-start',
          alignItems: 'center',
          p: 2,
          backgroundColor: '#2d3839',
        }}
      >
        <IconButton variant="soft" onClick={() => setOpen(true)}>
          <MenuIcon />
        </IconButton>
        <Typography level="h4" sx={{color: "#e0e4ce"}} ml={2}>
          Recicla+
        </Typography>
      </Box>

      {/* Sidebar para desktop */}
      <Sheet
        variant="solid"
        color="primary"
        sx={{
          width: 240,
          p: 3,
          backgroundColor: '#2d3839',
          borderRight: '1px solid #6e9987',
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {renderSidebarContent()}
      </Sheet>

      {/* Drawer para mobile */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Sheet
          sx={{
            width: 240,
            height: '100%',
            backgroundColor: '#2d3839',
            color: '#fff',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {renderSidebarContent()}
        </Sheet>
      </Drawer>

      {/* Conteúdo principal */}
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

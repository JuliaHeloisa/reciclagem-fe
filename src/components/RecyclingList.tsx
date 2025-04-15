'use client';

import React from 'react';
import { useRecyclingLocations } from '../hooks/useRecyclingLocations';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Stack,
} from '@mui/joy';

export function RecyclingList() {
  const { locations, loading } = useRecyclingLocations();

  if (loading) return <Typography>Carregando...</Typography>;

  return (
    <Stack spacing={2}>
      {locations.map((location) => (
        <Card
          key={location.id}
          variant="outlined"
          sx={{
            backgroundColor: '#2d3839',
            color: '#e0e4ce',
            borderColor: '#6e9987',
            width: '100%',
          }}
        >
          <CardContent>
            <Typography level="h4" sx={{ color: '#e0e4ce' }}>
              {location.name}
            </Typography>
            <Typography level="body-sm" sx={{color: '#e0e4ce'}}>{location.address}</Typography>
          </CardContent>
          <CardActions>{/* Futuro: editar, excluir, avaliar */}</CardActions>
        </Card>
      ))}
    </Stack>
  );
}

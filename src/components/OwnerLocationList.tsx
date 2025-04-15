'use client';

import { useMyRecyclingLocations } from '@/hooks/useMyRecyclingLocations';
import { deleteRecyclingLocation } from '@/services/recyclingLocationService';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Card, CardContent, Stack, Typography } from '@mui/joy';

export default function OwnerLocationList() {
  const { locations, loading, refetch } = useMyRecyclingLocations();

  const handleDelete = async (id: string) => {
    if (confirm('Deseja realmente deletar este local?')) {
      try {
        await deleteRecyclingLocation(id);
        refetch()
      } catch (error) {
        alert('Erro ao deletar. Tente novamente.');
        console.error('Erro ao deletar local:', error);
      }
    }
  };

  if (loading) return <p>Carregando locais...</p>;

  return (
    <Stack spacing={2}>
      {locations.length === 0 ? (
        <Typography>Nenhum local cadastrado ainda.</Typography>) : locations.map((loc) => (
          <Card key={loc.id} sx={{ backgroundColor: '#2d3839' }}>
            <CardContent>
              <Typography level="h4" sx={{ color: '#e0e4ce' }}>{loc.name}</Typography>
              <Typography sx={{ color: '#e0e4ce' }}>{loc.address}</Typography>
              <Typography level="body-sm" sx={{ color: '#e0e4ce' }}>{loc.materialsAccepted}</Typography>
              <Stack direction="row" spacing={1} mt={2}>
                <Button
                  color="danger"
                  startDecorator={<DeleteIcon />}
                  onClick={() => loc.id && handleDelete(loc.id)}
                >
                  Deletar
                </Button>
                <Button
                  color="neutral"
                  startDecorator={<EditIcon />}
                  disabled // Funcionalidade de edição futura
                >
                  Editar
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      
    </Stack>
  );
}

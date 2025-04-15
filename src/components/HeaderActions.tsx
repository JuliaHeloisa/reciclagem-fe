import { Button } from '@mui/joy';
import { useAuth } from '@/hooks/useAuth';

export function HeaderActions() {
  const { logout } = useAuth();

  return (
    <Button
      onClick={logout}
      color="danger"
      variant="soft"
      size="sm"
    >
      Sair
    </Button>
  );
}

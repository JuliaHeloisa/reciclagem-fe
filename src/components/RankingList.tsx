'use client';

import { useEffect, useState } from 'react';
import { fetchUserRanking } from '@/services/rankingService';
import { Card, Typography, List, ListItem } from '@mui/joy';

export default function RankingList() {
  interface UserRanking {
    userId: string;
    email: string;
    total: number;
    name: string;
  }

  const [ranking, setRanking] = useState<UserRanking[]>([]);

  useEffect(() => {
    fetchUserRanking().then(setRanking);
  }, []);

  return (
    <>
      <Typography level="h2" sx={{ mb: 3, color: 'neutral.100', display: 'flex', justifyContent: 'center' }}>
        Ranking
      </Typography>
      <Card sx={{ backgroundColor: '#e0e4ce', p: 3 }}>
          <Typography level="h4" mb={2}>Ranking de Reciclagem</Typography>
          <List>
            {ranking.map((user, index) => (
              <ListItem key={user.userId}>
                <Typography>
                  {index + 1}. {user.name} — {user.total} reciclado(s)
                </Typography>
              </ListItem>
            ))}
          </List>
        </Card>
      </>
  );
}

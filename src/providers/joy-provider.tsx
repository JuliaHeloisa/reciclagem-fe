'use client';

import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { ReactNode } from 'react';
import theme from '../theme';

export function JoyProvider({ children }: { children: ReactNode }) {
  return (
    <CssVarsProvider theme={theme} defaultMode="light">
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}

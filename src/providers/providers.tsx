'use client';
export const dynamic = 'force-dynamic';

import { AuthProviderWrapper } from '@/context/AuthProviderWrapper';
import { JoyProvider } from './joy-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <JoyProvider>
        <AuthProviderWrapper>
            {children}
        </AuthProviderWrapper>
      </JoyProvider>
  );
}

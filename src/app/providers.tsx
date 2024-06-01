'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

export const AuthProvider = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

'use client';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={() => signIn('github')}>Login</Button>
    </main>
  );
}

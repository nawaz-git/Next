'use client';

import { signOut } from 'next-auth/react';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col'>
      <h1>
        Home
        <br />
        <button
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      </h1>
    </main>
  );
}

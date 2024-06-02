'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';

const Item: React.FC<Item> = ({ name, path }) => {
  return (
    <Link
      className='px-4 py-2 bg-white border hover:bg-slate-100 rounded-md'
      href={path ? path : '#'}
    >
      <span className='text-sm'>{name}</span>
    </Link>
  );
};

const Sidebar = () => {
  const [items, setItems] = useState<Item[]>([
    {
      name: 'Overview',
      path: '/dashboard',
    },
    {
      name: 'AWS',
    },
    {
      name: 'Snowflake',
    },
    {
      name: 'GCP',
    },
    {
      name: 'Azure',
    },
  ]);

  return (
    <div className='min-h-screen flex flex-col shadow-md min-w-[220px]'>
      <div className='py-4 border-b-2'>
        <h1 className='px-4 text-lg font-semibold'>finOpsly</h1>
      </div>
      <div className='flex-grow flex flex-col gap-3 py-4 px-3'>
        {items.map((item, index) => (
          <Item key={index} {...item} />
        ))}
      </div>
      <div className='py-2 px-3'>
        <button
          className='w-full px-4 py-2 text-sm bg-slate-100 border hover:bg-slate-200 rounded-md'
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

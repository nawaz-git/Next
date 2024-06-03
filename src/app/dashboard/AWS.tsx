'use client';

import Column from '@/components/Charts/Column';
import React, { useEffect, useState } from 'react';

const AWS = () => {
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('api/AWS');
        const data = await response.json();
        console.log(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='flex flex-col rounded-md bg-white shadow-sm p-4'>
      <div>
        <span className='text-lg font-medium'>Total Spend + Forecast</span>
      </div>
      <div>
        <Column
          data={[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
          labels={[
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
          ]}
        />
      </div>
    </div>
  );
};

export default AWS;

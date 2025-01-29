'use client'

import { useRouter } from 'next/navigation'
import React from 'react';

const Home = () => {
    const router = useRouter();
  return (
    <div className='flex justify-center items-center h-screen w-full'>
        <button className='bg-[#209653] border-black border-2 text-white py-4 px-8 text-xl font-bold ' onClick={() => router.push('/compare')}>Go to candidates list</button>
    </div>
  );
};

export default Home;

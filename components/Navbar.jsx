'use client'

import Link from 'next/link';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className='mt-4 backdrop-blur-sm bg-white/10 rounded-2xl lg:max-w-fit lg:px-20 md:max-w-fit md:px-20 max-w-[60%] mx-auto text-white h-10 flex items-center justify-center'>
      <div className='hover:bg-white/30 p-1 rounded-lg'>
        <Link href='/'>Home</Link>
      </div>
      {session?.user && (
        <>
          <div className='px-2 hover:bg-white/30 p-1 rounded-lg'>
            <Link href='/profile'>Profile</Link>
          </div>
        </>
      )}
      {session?.user ? (
        <div className='hover:bg-white/30 p-1 rounded-lg'>
          <button onClick={signOut}>Logout</button>
        </div>
      ) : (
        <div className='hover:bg-white/30 p-1 rounded-lg'>
          <button onClick={signIn}>Login</button>
        </div>
      )}
    </div>
  );
}
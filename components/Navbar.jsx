import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className='mt-4 backdrop-blur-sm bg-white/10 rounded-2xl lg:max-w-md max-w-[60%] mx-auto text-white h-10 flex items-center justify-center'>
        <Link href='/'>
            <div className='hover:bg-white/30 p-1 rounded-lg'>Home</div>
        </Link>
        <Link href='/profile'>
            <div className='mx-5 hover:bg-white/30 p-1 rounded-lg'>Profile</div>
        </Link>
        <Link href='/'>
            <div className='hover:bg-white/30 p-1 rounded-lg'>Logout</div>
        </Link>
    </div>
  )
}

'use client'
import Image from 'next/image'
import Book1 from '@/assets/Book1.png'
import { signIn, signOut, useSession } from 'next-auth/react'


export default function Home() {
  const { data: session} = useSession()

  return (
    <div className="flex justify-center px-5 max-w-[80%] flex-wrap mx-auto mt-10 h-96">
      <div className='flex-col lg:max-w-[50%] md:max-w-[80%]'>
      <div>
        <p className="mt-16 bluegradient text-4xl">WELCOME TO BOOKNOTE APP</p>
        </div>
        <div>
        <p className="text-white mt-10 lg:mt-5">Discover and manage your favorite books effortlessly. Search, add to favorites, and create notes to enhance your reading experience and never forget a captivating story.</p>
        {session?.user ? ( 
        <button onClick={() => signOut()} className='mt-5 bg-gradient-to-l from-cyan-400 to-blue-500 text-white h-10 rounded-md w-20'>Logout</button>
        ) : (
          <button onClick={() => signIn()} className='mt-5 bg-gradient-to-l from-cyan-400 to-blue-500 text-white h-10 rounded-md w-20'>Login</button>   
        )}
        </div>
      </div>
      <div className='mt-16 lg:mt-6'>
        <Image src={Book1} alt="book" width={400} />
      </div>
    </div>
  )
}

'use client'
import Image from 'next/image'
import Book1 from '@/assets/Book1.png'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@/components/Card';


export default function Home() {
  const { data: session} = useSession()
  const [search, setSearch] = useState("");
  const [bookData, setBookData] = useState([]);

  const searchBook = (e) => {
    e.preventDefault(); 
  axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyAF-wbPhoDx5D4KH5swM9FMave4RqN-J_0')
  .then(res=>setBookData(res.data.items))
  .catch(err=>console.log(err))
  console.log(bookData)
}

  return (
    <div className="flex justify-center px-5 max-w-[80%] flex-wrap mx-auto mt-10 h-96">
      {session?.user ? (
        <>
        <div className='flex-col lg:max-w-[60%] md:max-w-[80%] text-center'>
       <h1 className="mt-5 bluegradient text-3xl">WELCOME TO BOOKNOTE APP</h1>
       <p className='text-white mt-5'>You signed in as <span className='italic'>{session?.user?.name}.</span>You can search and add books to your library now.</p>
       <form onSubmit={searchBook} className='mt-10'>
            <div className='pt-5'>
                <input type="text" className='bg-gray-50 border border-gray-300 mx-auto text-gray-900 lg:max-w-[70%] max-w-[85%] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Enter a book name' value={search} onChange={e => setSearch(e.target.value)}  />
            </div>
            <div className='pt-5'>
                <button className='mt-5 bg-gradient-to-l from-cyan-400 to-blue-500 text-white h-10 rounded-md w-20'>Search</button>
            </div>
        </form>
        <div>
        {
          <div className=' lg:ml-24'>
          <Card book={bookData}/>
          </div>
        }  
        </div>
       </div>
       </>
      ) : (
        <div className='flex-col lg:max-w-[50%] md:max-w-[80%]'>
          <div>
            <p className="mt-16 bluegradient text-4xl">WELCOME TO BOOKNOTE APP</p>
          </div>
          <div>
            <p className="text-white mt-10 lg:mt-5">Discover and manage your favorite books effortlessly. Search, add to favorites, and create notes to enhance your reading experience and never forget a captivating story.</p>
            <button onClick={() => signIn()} className='mt-5 bg-gradient-to-l from-cyan-400 to-blue-500 text-white h-10 rounded-md w-20'>Login</button>
          </div>
        </div>
      )}
      {!session?.user && (
        <div className='mt-16 lg:mt-6'>
          <Image src={Book1} alt="book" width={400} priority={true} />
        </div>
      )}
    </div>
  );
}
'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@/components/Card';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Search() {
  const {data: session} = useSession()

  useEffect(() => {
    if(!session){
      Router.push('/')
    }
  }, [session]);

    const [search, setSearch] = useState("");
    const [bookData, setData] = useState([]);
    const searchBook = (e) => {
          e.preventDefault(); 
        axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyAF-wbPhoDx5D4KH5swM9FMave4RqN-J_0')
        .then(res=>setData(res.data.items))
        .catch(err=>console.log(err))
    }

  return (
    <div className=' max-w-[90%] mt-10 mx-auto flex flex-col justify-center items-center text-center'>
        <form onSubmit={searchBook}>
            <label className='text-white text-3xl'>Search a Book</label>
            <div className='pt-10'>
                <input type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Enter book name' value={search} onChange={e => setSearch(e.target.value)}  />
            </div>
            <div className='pt-5'>
                <button className='mt-5 bg-gradient-to-l from-cyan-400 to-blue-500 text-white h-10 rounded-md w-20'>Submit</button>
            </div>
        </form>
        <div>
        {
          <Card book={bookData}/>
        }  
        </div>
    </div>
  )
}

'use client'
import {useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const Profile = () => {
    const {data: session} = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!session) {
           router.push('/')
        }
    }, [session]);
  return ( 
    <div>
        profile
    </div>
  )
}

export default Profile
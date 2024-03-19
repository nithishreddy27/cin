import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Header() {
    const { data: session, status } = useSession()
    // const router = useRouter()
    // console.log("status ",status , session);
    const [user, setUser] = useState()

    useEffect(()=>{
      if(status == "authenticated" && session){
        getOrganizer(session)
      }
      if(status == "unauthenticated"){
        // router.push("/auth/login")
      }
    },[session])

    async function getOrganizer(session){
        const userResponse = await axios.get(`/api/user?email=${session?.user?.email}`)
        // console.log("user in header ",userResponse?.data.user);
        setUser(userResponse?.data.user)
      }

  return (
    <div className='bg-white'>
        <header class="text-gray-600 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
     <img src="./ciencia.png" alt=""  className='h-5' />
      <span class="ml-3 text-xl">Ciencia</span>
    </a>
    <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
    <Link class="mr-5 hover:text-gray-900" href={"/checkbalance"}>Check balanace</Link>
    {status == "unauthenticated" ? <Link class="mr-5 hover:text-gray-900" href={"/auth/login"}>Login</Link> : 
     <div>
      {user?.userType == "register" && (
        <div className='flex '>
            <Link class="mr-5 hover:text-gray-900" href={"/"}>Register</Link>
            <Link class="mr-5 hover:text-gray-900" href={"/recharge"}>Recharge</Link>

        </div>
      )}
  {user?.userType == "organiser" && (
      <Link class="mr-5 hover:text-gray-900" href='/dashboard/event/1'> Event</Link>)}
     </div>
      } 
      {status == "authenticated" && (
      <span onClick={()=>{signOut()}} className='mx-2 cursor-pointer'>Sign Out</span>
      )}

    </nav>

  </div>
</header>
    </div>
  )
}

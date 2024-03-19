import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div>
        <div className='flex justify-center w-[100%] p-10'>
            <div className='mx-5'>

            <Link href={"/"} className='mx-5'>Register</Link>
            </div>
            <div className='mx-5'>

            <Link href={"/recharge"} className='mx-5'>Recharge</Link>
            </div>
            <div className='mx-5'>

            <Link href={"/"} className='mx-5'></Link>
            </div>
            <div className='mx-5'>

            <Link href={"/auth/login"} className='mx-5'>Login</Link>
            </div>
            <div className='mx-5'>

            <Link href={"/dashboard/event/12333"} className='mx-5'>Event</Link>
            </div>
        </div>
    </div>
  )
}

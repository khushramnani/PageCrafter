"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'
import DashNav from '@/components/DashNav'
// import { useRouter } from 'next/navigation'
import Link from 'next/link'



const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/Login");
    return null; //  this return to avoid rendering the rest of the component
  }
  return (
<>
    
    <DashNav/>
    <div className=' w-full bg-[#021526] h-screen  text-white'>

<div className="flex items-center justify-center">
<Link href="/buildArea">
<button  type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Create Your Website</button></Link>
</div>
<button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </button>
    </div>

    </>
  )
}

export default Dashboard

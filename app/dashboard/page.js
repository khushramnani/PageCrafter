"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
// import { useRouter } from 'next/navigation'
import Link from 'next/link'



const page = () => {
    const { data: session } = useSession()
    if(!session) {
        const router = useRouter()
        router.push("/Login")
}
  return (
<>
    
    
    <div className='absolute top-0 z-[-2] pt-16 w-screen bg-blue-950 h-[90vh] text-white'>
      <h1>dashboard</h1>
      <img src="" alt="" />
      <img className='rounded-full' src={session.user.image} alt="" />
      <h1>Username : {session.user.name}</h1>
      {console.log(session.user.image)}
    </div>
    <Link href="/buildArea">
    <button  type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Create Your Website</button></Link>

    </>
  )
}

export default page

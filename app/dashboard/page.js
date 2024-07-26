"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
// import { useRouter } from 'next/navigation'



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
    </>
  )
}

export default page

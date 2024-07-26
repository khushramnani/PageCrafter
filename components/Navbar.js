"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"


const Navbar = () => {
    // const { data: session } = useSession()
    // if(session) {
    //   return <>
    //     Signed in as {session.user.email} <br/>
    //     <button onClick={() => signOut()}>Sign out</button>
    //   </>
    // }
  return (
    
    <>
        <nav className=' text-white w-full p-4 flex items-center justify-between'>

<Image className='w-12'
      src="/assets"
      width={500}
      height={500}
      alt="logo"
    />    

    <div className='flex pr-4 gap-8'>

     <button>Docs</button>   
    <Link rel="stylesheet" href={"/Login"} > <button>Login</button>  </Link>


    </div>

            </nav>
    
    </>

  )
}

export default Navbar

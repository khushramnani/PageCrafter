import React from 'react'
import Image from 'next/image'

function Images() {
  return (
    <>
   
    <Image className={'w-full '} width={1000} height={1000} sizes='100vw' src={"https://plus.unsplash.com/premium_photo-1707932495000-5748b915e4f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"}  alt="..."/>
    
    </>
  )
}

export default Images

import React from 'react'
import EditorHeader from '../components/header/EditorHeader'

const page = () => {
  return (
    <div className='bg-gray-700 h-screen'>
      <EditorHeader/>
      <div>
        <div className='grid grid-cols-5 h-[calc(100vh-64px)]'>
          <div className='col-span-1 bg-gray-800 p-4 text-white'>
            sidebar
          </div>
          <div className='col-span-3 bg-gray-200 p-4'>
            canvas
          </div>
          <div className='col-span-1 bg-gray-800 p-4 text-white'>
            settings bar
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default page

import { LoaderIcon } from 'lucide-react'
import React from 'react'

const PageLoader = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-lilac-50'>
        <LoaderIcon className='size-10 animate-spin text-lilac-500'/>
    </div>
  )
}

export default PageLoader
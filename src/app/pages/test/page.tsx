import React from 'react'
import Posts from '@/app/widgets/Posts'

const page = () => {
  return (
    <div className="flex flex-col items-center">
        <h1 className="text-2xl mb-4">File Upload</h1>
        <Posts />
    </div>
  )
}

export default page
import React from 'react'
import FileUploader from '@/app/widgets/FileUploader'

const page = () => {
  return (
    <div className="flex flex-col items-center pt-32">
        <h1 className="text-2xl mb-4">File Upload</h1>
        <FileUploader />
    </div>
  )
}

export default page
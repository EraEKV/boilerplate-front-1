"use client"

import React, { useState } from 'react';
import { useMutation } from 'react-query';

const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('files', file);

    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('File upload failed');
    }

    return response.json();
};


const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const mutation = useMutation(uploadFile, {
        onSuccess: (data) => {
            console.log('Upload success:', data);
        },
        onError: (error) => {
            console.error('Upload error:', error);
        },
    });

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         const selectedFile = e.target.files[0];
    //         const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf']; // Задайте свои типы файлов
    //         if (!allowedTypes.includes(selectedFile.type)) {
    //             alert('Invalid file type. Please upload an image or PDF.');
    //             return;
    //         }
    //         setFile(selectedFile);
    //     }
    // };
    

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (file) {
            mutation.mutate(file);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Upload
            </button>
            {mutation.isLoading && <p>Uploading...</p>}
            {mutation.isError && <p className="text-red-500">Error uploading file</p>}
            {mutation.isSuccess && <p className="text-green-500">File uploaded successfully!</p>}
        </div>
    );
};

export default FileUpload;

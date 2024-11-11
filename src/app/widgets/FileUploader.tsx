"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { Progress } from "@/app/shared/ui/progress";

interface UploadResponse {
  url: string;
}

interface UploadedFile {
  file: File;
  url: string;
  progress: number;
}

const uploadFile = async (file: File, _onProgress: (progress: number) => void): Promise<UploadResponse> => {
  const fileExtension = file.name.split(".").pop();
  const filename = `${uuidv4()}.${fileExtension}`;

  const uploadUrl = `https://9xsppiuy14.execute-api.eu-north-1.amazonaws.com/dev/decentrathon/${filename}.${fileExtension}`;

  const formData = new FormData();
  formData.append("file", file);

  const requestOptions = {
    method: "PUT",
    body: formData,
    headers: {
      "Content-Type": "application/octet-stream",
    },
  };

  try {
    const response = await fetch(uploadUrl, requestOptions);

    if (!response.ok) {
      throw new Error("File upload failed");
    }

    return { url: uploadUrl };
  } catch (error) {
        console.log(error);
        throw new Error("File upload failed");
  }
};

const FileUploader: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (file: File) =>
      uploadFile(file, (progress) => {
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.file === file ? { ...f, progress } : f
          )
        );
      }),
    onSuccess: (data: UploadResponse, file) => {
      queryClient.invalidateQueries("uploadedFiles");
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.file === file ? { ...f, url: data.url } : f
        )
      );
      localStorage.setItem("uploadedFile", data.url);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const photoFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    const newFiles = photoFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      progress: 0,
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleUpload = () => {
    files.forEach(({ file }) => mutation.mutate(file));
  };

  const removeFile = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.file !== file));
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => document.getElementById("fileInput")?.click()}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Выбрать фото
      </button>
      <input
        id="fileInput"
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Загрузить
      </button>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {files.map(({ file, url, progress }, index) => (
          <div key={index} className="relative group">
            <img
              src={url}
              alt={`preview-${index}`}
              className="w-full h-32 object-cover border rounded-lg"
              onClick={() => setSelectedImage(url)}
            />
            <Progress value={progress} className="absolute bottom-0 left-0 w-full" />
            <button
              onClick={() => removeFile(file)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-sm">
            <img src={selectedImage} alt="Full preview" className="w-full h-auto" />
            <button
              onClick={() => setSelectedImage(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;

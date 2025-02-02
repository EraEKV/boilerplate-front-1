"use client";

import { useState, DragEvent, ChangeEvent } from "react";

const FileUpload = () => {
    const [file, setFile] = useState<string | undefined>();
    const [fileEnter, setFileEnter] = useState(false);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setFileEnter(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setFileEnter(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setFileEnter(false);

        if (e.dataTransfer.items) {
            Array.from(e.dataTransfer.items).forEach((item, i) => {
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    if (file) {
                        const blobUrl = URL.createObjectURL(file);
                        setFile(blobUrl);
                        console.log(`items file[${i}].name = ${file.name}`);
                    }
                }
            });
        } else {
            Array.from(e.dataTransfer.files).forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
            });
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const blobUrl = URL.createObjectURL(files[0]);
            setFile(blobUrl);
        }
    };

    return (
        <div className="container px-4 max-w-5xl mx-auto cursor-pointer">
            {!file ? (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`${
                        fileEnter ? "border-4" : "border-2"
                    } mx-auto bg-white flex flex-col w-full max-w-xs h-72 border-dashed items-center justify-center cursor-pointer rounded-lg hover:border-primary transition duration-300 ease-in-out`}
                >
                    <label
                        htmlFor="file"
                        className="h-full flex flex-col justify-center text-center cursor-pointer"
                    >
                        Click to upload or drag and drop
                    </label>
                    <input
                        id="file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
            ) : (
                <div className="flex flex-col items-center cursor-pointer">
                    <object
                        className="rounded-md w-full max-w-xs h-72"
                        data={file}
                        type="image/png" // можно динамически обновить в зависимости от типа файла
                    />
                    <button
                        onClick={() => setFile(undefined)}
                        className="px-4 mt-10 uppercase py-2 tracking-widest outline-none bg-primary text-white rounded-lg"
                    >
                        Remove
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileUpload;

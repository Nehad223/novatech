"use client";

import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

export default function UploadPage() {
  const [result, setResult] = useState();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <CldUploadWidget
        uploadPreset="unsigned_preset" // اسم الـ preset تبعك
        onSuccess={(result) => {
          setResult(result?.info);
        }}
      >
        {({ open }) => {
          function handleOnClick() {
            open();
          }

          return (
            <button
              onClick={handleOnClick}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>

      {result && (
        <div className="mt-6">
          <p className="text-gray-400 mb-2">{result.public_id}</p>
          <img
            src={result.secure_url}
            alt="Uploaded image"
            width={300}
            className="rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
}

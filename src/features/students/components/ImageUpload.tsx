import React, { useState } from "react";

interface ImageUploadProps {
  onFileSelect: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-gray-400 text-3xl">👤</span>
        )}
      </div>

      <label className="mt-3 text-blue-600 text-sm font-medium cursor-pointer hover:underline">
        Upload a file
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>
      <p className="text-gray-400 text-xs mt-1">PNG, JPG, GIF up to 10MB</p>
    </div>
  );
};

export default ImageUpload;

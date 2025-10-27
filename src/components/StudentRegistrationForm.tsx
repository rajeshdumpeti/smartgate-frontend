import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRegisterStudent } from "../hooks/useRegisterStudent";

interface FormData {
  name: string;
  grade: string;
  section?: string;
  photo: FileList;
}

const StudentRegistrationForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const mutation = useRegisterStudent();
  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      let base64Image: string | null = null;
      if (data.photo && data.photo.length > 0) {
        const file = data.photo[0];
        base64Image = await toBase64(file);
      }

      await mutation.mutateAsync({
        name: data.name,
        grade: data.grade,
        section: data.section,
        photo_base64: base64Image,
      });

      alert("✅ Student registered successfully!");
      reset();
      setPreview(null);
    } catch (err) {
      alert("❌ Failed to register student.");
      console.error(err);
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Register Student</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            {...register("name", { required: true })}
            className="w-full border rounded px-3 py-2"
            placeholder="Student Name"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Grade</label>
          <input
            {...register("grade", { required: true })}
            className="w-full border rounded px-3 py-2"
            placeholder="Grade"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Section</label>
          <input
            {...register("section")}
            className="w-full border rounded px-3 py-2"
            placeholder="Section"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            {...register("photo")}
            onChange={handleFileChange}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
        >
          {mutation.isPending ? "Registering..." : "Register Student"}
        </button>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;

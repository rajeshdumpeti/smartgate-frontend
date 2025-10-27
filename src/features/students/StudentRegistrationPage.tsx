import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { registerStudent } from "../../api/students";
import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import Button from "../../components/ui/Button";

const studentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  studentId: z.string().optional(),
  grade: z.string().min(1, "Grade is required"),
  section: z.string().min(1, "Section is required"),
  dob: z.string().min(1, "Date of birth is required"),
  parent_phone: z.string().min(1, "phone Number required"),
  imageFile: z.instanceof(File).optional(),
});

type StudentForm = z.infer<typeof studentSchema>;

const StudentRegistrationPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentForm>({
    resolver: zodResolver(studentSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: StudentForm) => {
      let base64 = "";
      if (selectedFile) {
        base64 = await fileToBase64(selectedFile);
      }

      const payload = {
        name: data.name,
        grade: data.grade,
        section: data.section,
        date_of_birth: data.dob,
        student_id: data.studentId || undefined,
        parent_phone: data.parent_phone,
        photo_base64: base64,
      };
      return registerStudent(payload);
    },
    onSuccess: () => {
      alert("✅ Student registered successfully!");
      reset();
      setSelectedFile(null);
    },
    onError: (err: any) => {
      console.error(err);
      alert("❌ Failed to register student");
    },
  });

  async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  if (mutation.isPending) {
    console.log("Registration in progress...");
  }

  return (
    <div className="p-2 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        New Student Registration
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Student Information
        </h2>

        {/* REMOVED the duplicate onSubmit from form - only keep handleSubmit */}
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Student's Full Name
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter student's full name"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Student ID */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Student ID
            </label>
            <input
              type="text"
              {...register("studentId")}
              placeholder="Leave blank to auto-generate"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Grade */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Grade Level
            </label>
            <input
              type="text"
              {...register("grade")}
              placeholder="Select grade"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.grade && (
              <p className="text-red-500 text-xs mt-1">
                {errors.grade.message}
              </p>
            )}
          </div>

          {/* Section */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Section/Class
            </label>
            <input
              type="text"
              {...register("section")}
              placeholder="e.g., Section A, 2B"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.section && (
              <p className="text-red-500 text-xs mt-1">
                {errors.section.message}
              </p>
            )}
          </div>

          {/* DOB */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dob")}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.dob && (
              <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>
            )}
          </div>

          {/* Parent Phone - ADDED THIS MISSING FIELD */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Parent Phone Number
            </label>
            <input
              type="text"
              {...register("parent_phone")}
              placeholder="Enter parent's phone number"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.parent_phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.parent_phone.message}
              </p>
            )}
          </div>

          {/* Photo Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student Photo
            </label>
            <ImageUpload onFileSelect={setSelectedFile} />
          </div>

          {/* Buttons - REMOVED onClick from submit button */}
          <div className="md:col-span-2 flex justify-end gap-3 mt-8">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                reset();
                setSelectedFile(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              // REMOVED the onClick handler here - form onSubmit will handle it
            >
              {mutation.isPending ? "Registering..." : "Register Student"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistrationPage;

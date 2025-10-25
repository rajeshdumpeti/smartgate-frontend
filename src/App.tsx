import "./index.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-brand mb-2 text-center">
          SmartGate – Local MVP
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Welcome to the SmartGate local-first prototype.
        </p>

        <div className="mt-6 border-t border-gray-200 pt-4 text-center">
          <p className="text-sm text-gray-500">
            🚧 Feature modules coming soon: Registration, Detection, Attendance
            Viewer
          </p>
        </div>
      </div>
    </div>
  );
}

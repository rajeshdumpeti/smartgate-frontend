import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardPage from "@/features/dashboard/DashboardPage";
import StudentListPage from "@/features/students/StudentListPage";
import AttendanceLogPage from "@/features/attendance/AttendanceLogPage";
import SettingsPage from "@/features/settings/SettingsPage";
import Layout from "@/components/layout/Layout";
import "./index.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/students" element={<StudentListPage />} />
          <Route path="/logs" element={<AttendanceLogPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

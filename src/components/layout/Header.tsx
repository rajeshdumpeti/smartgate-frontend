import { FaBars, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUIStore } from "../../store/useUIStore";
import { getFormattedDateTime } from "../../utils/dateUtils";
import Button from "../ui/Button";

const Header = () => {
  const { toggleSidebar } = useUIStore();
  const currentDate = getFormattedDateTime();
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/students/register");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle Sidebar"
        >
          <FaBars size={20} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">
          SmartGate Dashboard
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="primary"
          onClick={handleRegisterClick}
          className="flex items-center gap-2 text-sm"
        >
          <FaUserPlus />
          Register Student
        </Button>

        <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-lg shadow-inner">
          {currentDate}
        </div>
      </div>
    </header>
  );
};

export default Header;

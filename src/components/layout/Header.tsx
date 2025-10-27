import { FaBars } from "react-icons/fa";
import { useUIStore } from "../../store/useUIStore";
import { getFormattedDateTime } from "../../utils/dateUtils";

const Header = () => {
  const { toggleSidebar } = useUIStore();
  const currentDate = getFormattedDateTime();
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Left Section - Hamburger + Title */}
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

      {/* Right Section - Date */}
      <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-lg shadow-inner">
        {currentDate}
      </div>
    </header>
  );
};

export default Header;

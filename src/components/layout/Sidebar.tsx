import { NavLink } from "react-router-dom";
import {
  FaChartBar,
  FaVideo,
  FaCogs,
  FaQuestionCircle,
  FaSignOutAlt,
  FaClock,
} from "react-icons/fa";
import { useUIStore } from "../../store/useUIStore";
import logo from "../../assets/logo2.svg";
import clsx from "clsx";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useUIStore();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
    { name: "Events", path: "/events", icon: <FaClock /> },
    { name: "Cameras", path: "/cameras", icon: <FaVideo /> },
    { name: "Settings", path: "/settings", icon: <FaCogs /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity",
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={closeSidebar}
      />

      {/* Sidebar container */}
      <aside
        className={clsx(
          "fixed md:static z-40 h-full w-64 bg-white shadow-md border-r border-gray-200 flex flex-col transform transition-transform duration-300",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Brand section */}
        <div className="px-6 py-6 border-b border-gray-100 flex items-center gap-3">
          <img
            src={logo}
            alt="SmartGate logo"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-800 leading-tight">
              SmartGate
            </h1>
            <p className="text-xs text-gray-400">AI Monitoring</p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map(({ name, path, icon }) => (
            <NavLink
              key={name}
              to={path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                )
              }
            >
              <span className="text-lg">{icon}</span>
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Footer section */}
        <div className="px-6 py-4 border-t border-gray-100 space-y-3 text-sm text-gray-600">
          <button className="flex items-center gap-3 hover:text-blue-600">
            <FaQuestionCircle /> Help
          </button>
          <button className="flex items-center gap-3 hover:text-blue-600">
            <FaSignOutAlt /> Log Out
          </button>
          <p className="text-xs text-gray-400 mt-3">
            © {new Date().getFullYear()} SmartGate
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

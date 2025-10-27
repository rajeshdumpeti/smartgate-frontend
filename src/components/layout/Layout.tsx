import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-inter">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-2 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

// src/layout/AdminLayout.jsx
import AdminSidebar from "../common/AdminSidebar";
import AdminHeader from "../common/AdminHeader";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />

      {/* Right side layout */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />

        {/* Only this part should scroll */}
        <main className="flex-1 overflow-y-auto p-6 text-base font-medium">
          <Outlet />
        </main>

        {/* Footer */}
        <div className="text-xs text-gray-400 border-t mt-auto px-2 py-2">
          &copy; {new Date().getFullYear()} Admin Dashboard
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

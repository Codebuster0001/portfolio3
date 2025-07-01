// src/layout/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "../common/AdminSidebar";
import AdminHeader from "../common/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <AdminHeader />

        {/* Scrollable main section */}
        <main className="flex-1 overflow-y-auto p-6 text-base font-medium">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="text-xs text-muted-foreground border-t px-4 py-2 text-center">
          &copy; {new Date().getFullYear()} Admin Dashboard
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
